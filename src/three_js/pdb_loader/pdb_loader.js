import * as THREE from 'three';
import Structure from '../../pdb/structure';

function hash(s, e) {
  return 's' + Math.min(s, e) + 'e' + Math.max(s, e);
}

class PDBLoader extends THREE.Loader {
  atoms = [];
  #bonds = [];
  #bhash = {};
  #atomMap = {};

  parse(text) {
    const structure = new Structure(text);

    structure.getEntries().forEach((entry) => {
      switch (entry.getType()) {
        case 'ATOM':
          this.parseAtom(entry);
          break;
        case 'HETATM':
          this.parseAtom(entry);
          break;
        case 'CONECT':
          this.parseConect(entry);
          break;
        default:
          console.warn('3D rendering not currently supported for', entry);
          break;
      }
    });

    return this.buildGeometry();
  }

  parseAtom(entry) {
    const atom = entry;
    const serialNumber = entry['serialNumber'];

    this.atoms.push(atom);
    this.#atomMap[serialNumber] = atom;
  }

  parseConect(entry) {
    this.parseBond(entry['serial2'], entry['serial1']);
    this.parseBond(entry['serial3'], entry['serial1']);
    this.parseBond(entry['serial4'], entry['serial1']);
    this.parseBond(entry['serial5'], entry['serial1']);
  }

  buildGeometry() {
    const build = {
      geometryAtoms: new THREE.BufferGeometry(),
      geometryBonds: new THREE.BufferGeometry(),
      json: {
        atoms: this.atoms,
      },
    };
    const geometryAtoms = build.geometryAtoms;
    const geometryBonds = build.geometryBonds;
    const verticesAtoms = [];
    const colorsAtoms = [];
    const verticesBonds = []; // atoms

    // Set the vertices for each atom.
    this.atoms.forEach((atom) => {
      const x = atom['xOrthogonalCoordinate'];
      const y = atom['yOrthogonalCoordinate'];
      const z = atom['zOrthogonalCoordinate'];
      verticesAtoms.push(x, y, z);

      const rgbColor = atom.getCPKColor();
      const r = rgbColor[0] / 255;
      const g = rgbColor[1] / 255;
      const b = rgbColor[2] / 255;
      colorsAtoms.push(r, g, b);
    });

    // Set the atom bonds
    this.#bonds.forEach((bond) => {
      const start = bond[0];
      const end = bond[1];
      const startAtom = this.#atomMap[start];
      const endAtom = this.#atomMap[end];

      let x = startAtom['xOrthogonalCoordinate'];
      let y = startAtom['yOrthogonalCoordinate'];
      let z = startAtom['zOrthogonalCoordinate'];
      verticesBonds.push(x, y, z);

      x = endAtom['xOrthogonalCoordinate'];
      y = endAtom['yOrthogonalCoordinate'];
      z = endAtom['zOrthogonalCoordinate'];
      verticesBonds.push(x, y, z);
    });

    geometryAtoms.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(verticesAtoms, 3)
    );
    geometryAtoms.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colorsAtoms, 3)
    );
    geometryBonds.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(verticesBonds, 3)
    );
    return build;
  }

  parseBond(eatom, satom) {
    if (eatom) {
      const h = hash(satom, eatom);

      if (this.#bhash[h] === undefined) {
        this.#bonds.push([satom, eatom, 1]);
        this.#bhash[h] = this.#bonds.length - 1;
      } else {
        // doesn't really work as almost all PDBs
        // have just normal bonds appearing multiple
        // times instead of being double/triple bonds
        // bonds[bhash[h]][2] += 1;
      }
    }
  }
}

export default PDBLoader;
