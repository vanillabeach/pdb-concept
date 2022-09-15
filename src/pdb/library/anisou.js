/**
 * The ANISOU records present the anisotropic temperature factors.
 *
 * Definitions can be found at https://bit.ly/3A2ZCHX
 */

import PDBPrimitive from '../pdb_primitive';
import Snippet from '../snippet';

export default class Anisou extends PDBPrimitive {
  serialNumber; // Atom serial number.
  name; // Atom name.
  alternateLocation; // Alternate location indicator.
  residueName; // Residue name.
  chainIdentifier; // Chain identifier.
  residueSequenceNumber; // Residue sequence number.
  insertionCode; // Insertion code.
  u_0_0; // U(1,1)
  u_1_1; // U(2,2)
  u_2_2; // U(3,3)
  u_0_1; // U(1,2)
  u_0_2; // U(1,3)
  u_1_2; // U(2,3)
  element; // Element symbol, right-justified.
  charge; // Charge on the atom.

  constructor(args) {
    super();
    if (args.rawData) {
      this.parse(args.rawData);
    }
  }

  static type = 'ANISOU';

  getType() {
    return 'ANISOU';
  }

  parse(rawData) {
    this.serialNumber = new Snippet(rawData, 7, 11).toInteger();
    this.name = new Snippet(rawData, 13, 16).toCharacter();
    this.alternateLocation = new Snippet(rawData, 17, 17).toCharacter();
    this.residueName = new Snippet(rawData, 18, 20).toCharacter();
    this.chainIdentifier = new Snippet(rawData, 22, 22).toCharacter();
    this.residueSequenceNumber = new Snippet(rawData, 23, 26).toInteger();
    this.insertionCode = new Snippet(rawData, 27, 27).toCharacter();
    this.u_0_0 = new Snippet(rawData, 29, 35).toInteger();
    this.u_1_1 = new Snippet(rawData, 36, 42).toInteger();
    this.u_2_2 = new Snippet(rawData, 43, 49).toInteger();
    this.u_0_1 = new Snippet(rawData, 50, 56).toInteger();
    this.u_0_2 = new Snippet(rawData, 57, 63).toInteger();
    this.u_2_2 = new Snippet(rawData, 64, 70).toInteger();
    this.element = new Snippet(rawData, 77, 78).toCharacter();
    this.charge = new Snippet(rawData, 79, 80).toCharacter();
  }
}
