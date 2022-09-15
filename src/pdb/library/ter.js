/**
 * Indicates the end of a chain of residues. For example, a hemoglobin molecule
 * consists of four subunit chains that are not connected. TER indicates the end
 * of a chain and prevents the display of a connection to the next chain.
 *
 * Definitions can be found at https://bit.ly/3BIPnv1
 */

import PDBPrimitive from '../pdb_primitive';
import Snippet from '../snippet';

export default class Ter extends PDBPrimitive {
  serialNumber;
  residueName;
  chainIdentifier;
  residueSequenceNumber;
  codeForInsertionsOfResidue;

  constructor(args) {
    super();
    if (args.rawData) {
      this.parse(args.rawData);
    }
  }

  static type = 'TER';

  getType() {
    return 'TER';
  }

  parse(rawData) {
    this.serialNumber = new Snippet(rawData, 7, 11).toInteger();
    this.residueName = new Snippet(rawData, 18, 20).toCharacter();
    this.chainIdentifier = new Snippet(rawData, 22, 22).toCharacter();
    this.residueSequenceNumber = new Snippet(rawData, 23, 26).toInteger();
    this.codeForInsertionsOfResidue = new Snippet(
      rawData,
      27,
      27
    ).toCharacter();
  }
}
