/**
 * Class to hold the parsed structure of a given PDB file.
 */

import Anisou from './library/anisou';
import Atom from './library/atom';
import Conect from './library/conect';
import Helix from './library/helix';
import HetAtm from './library/hetatm';
import SSBond from './library/ssbond';
import Sheet from './library/sheet';
import Ter from './library/ter';

import Snippet from './snippet';

export default class Structure {
  #rawPdbData;
  #entries = [];

  constructor(rawPdbData) {
    this.#rawPdbData = rawPdbData;
    this.#entries = this.parse(this.#rawPdbData);
  }

  getEntries() {
    return this.#entries;
  }

  getRawPdbData() {
    return this.#rawPdbData;
  }

  parse(textFile) {
    const lines = textFile.split('\n');
    const result = [];

    lines.forEach((line) => {
      const entryType = new Snippet(line, 1, 6).toCharacter().toUpperCase();

      switch (entryType) {
        case Anisou.type:
          result.push(new Anisou({ rawData: line }));
          break;

        case Atom.type:
          result.push(new Atom({ rawData: line }));
          break;

        case Conect.type:
          result.push(new Conect({ rawData: line }));
          break;

        case Helix.type:
          result.push(new Helix({ rawData: line }));
          break;

        case HetAtm.type:
          result.push(new HetAtm({ rawData: line }));
          break;

        case Sheet.type:
          result.push(new Sheet({ rawData: line }));
          break;

        case SSBond.type:
          result.push(new SSBond({ rawData: line }));
          break;

        case Ter.type:
          result.push(new Ter({ rawData: line }));
          break;

        default:
          break;
      }
    });

    return result;
  }
}
