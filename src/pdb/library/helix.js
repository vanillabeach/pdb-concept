/**
 * The HELIX record indicates the location and type (right-handed alpha, etc.)
 * of helices. One record per helix.
 *
 * Definitions can be found at https://bit.ly/3ptKnTu
 */

import PDBPrimitive from '../pdb_primitive';
import Snippet from '../snippet';

export default class Helix extends PDBPrimitive {
  serialNumber;
  identifier;
  initialResidueName;
  firstChainIdentifier;
  firstResidueSequenceNumber;
  firstCodeForInsertionsOfResidues;
  firstTerminalResidueName;
  secondChainIdentifier;
  secondResidueSequenceNumber;
  secondCodeForInsertionsOfResidues;
  typeOfHelix;
  comment;
  lengthOfHelix;

  constructor(args) {
    super();
    if (args.rawData) {
      this.parse(args.rawData);
    }
  }

  static type = 'HELIX';

  getType() {
    return 'HELIX';
  }

  parse(rawData) {
    this.serialNumber = new Snippet(rawData, 8, 10).toInteger();
    this.identifier = new Snippet(rawData, 12, 14).toCharacter();
    this.initialResidueName = new Snippet(rawData, 16, 18).toCharacter();
    this.firstChainIdentifier = new Snippet(rawData, 20, 20).toCharacter();
    this.firstResidueSequenceNumber = new Snippet(rawData, 22, 25).toInteger();
    this.firstCodeForInsertionsOfResidues = new Snippet(
      rawData,
      26,
      26
    ).toCharacter();
    this.firstTerminalResidueName = new Snippet(rawData, 28, 30).toCharacter();
    this.secondChainIdentifier = new Snippet(rawData, 32, 32).toCharacter();
    this.secondResidueSequenceNumber = new Snippet(rawData, 34, 37).toInteger();
    this.secondCodeForInsertionsOfResidues = new Snippet(
      rawData,
      38,
      38
    ).toCharacter();
    this.typeOfHelix = new Snippet(rawData, 39, 40).toInteger();
    this.comment = new Snippet(rawData, 41, 70).toCharacter();
    this.lengthOfHelix = new Snippet(rawData, 72, 76).toCharacter();
  }
}
