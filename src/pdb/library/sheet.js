/**
 * The SHEET record indicates the location, sense (anti-parallel, etc.) and 
 * registration with respect to the previous strand in the sheet (if any) \
 * of each strand in the model. One record per strand.
 *
 * Definitions can be found at https://bit.ly/3ptKnTu
 */

import PDBPrimitive from '../pdb_primitive';
import Snippet from '../snippet';

export default class Sheet extends PDBPrimitive {
  strandNumber;
  identifier;
  numberOfStrands;
  initialResidueName
  firstChainIdentifier;
  firstResidueSequenceNumber;
  firstCodeForInsertionsOfResidues;
  firstTerminalResidueName;
  secondChainIdentifier;
  secondResidueSequenceNumber;
  secondCodeForInsertionsOfResidues;
  strandSenseWithRespectToPrevious;
  firstAtomName;
  firstAtomResidueName;
  firstAtomChainIdentifier;
  firstAtomResidueSequenceNumber;
  firstAtomCodeForInsertionsOfResidue;
  secondAtomName;
  secondAtomResidueName;
  secondAtomChainIdentifier;
  secondAtomResidueSequenceNumber;
  secondAtomCodeForInsertionsOfResidue;

  constructor(args) {
    super();
    if (args.rawData) {
      this.parse(args.rawData);
    }
  }

  static type = 'SHEET';

  getType() {
    return 'SHEET';
  }

  parse(rawData) {
    this.strandNumber = new Snippet(rawData, 8, 10).toInteger();
    this.identifier = new Snippet(rawData, 12, 14).toCharacter();
    this.numberOfStrands = new Snippet(rawData, 15, 16).toInteger();
    this.initialResidueName = new Snippet(rawData, 18, 20).toCharacter();
    this.firstChainIdentifier = new Snippet(rawData, 22, 22).toCharacter();
    this.firstResidueSequenceNumber = new Snippet(rawData, 23, 26).toInteger();
    this.firstCodeForInsertionsOfResidues = new Snippet(rawData, 27, 27).toCharacter();
    this.firstTerminalResidueName = new Snippet(rawData, 29, 31).toCharacter();
    this.secondChainIdentifier = new Snippet(rawData, 33, 33).toCharacter();
    this.secondResidueSequenceNumber = new Snippet(rawData, 34, 37).toInteger();
    this.secondCodeForInsertionsOfResidues = new Snippet(rawData, 38, 38).toCharacter();
    this.strandSenseWithRespectToPrevious = new Snippet(rawData, 39, 40).toInteger();
    this.firstAtomName = new Snippet(rawData, 42, 45).toCharacter();
    this.firstAtomResidueName = new Snippet(rawData, 46, 48).toCharacter();
    this.firstAtomChainIdentifier = new Snippet(rawData, 50, 50).toCharacter();
    this.firstAtomResidueSequenceNumber = new Snippet(rawData, 51, 54).toInteger();
    this.firstAtomCodeForInsertionsOfResidue = new Snippet(rawData, 55, 55).toCharacter();
    this.secondAtomName = new Snippet(rawData, 57, 60).toCharacter();
    this.secondAtomResidueName = new Snippet(rawData, 61, 63).toCharacter();
    this.secondAtomChainIdentifier = new Snippet(rawData, 65, 65).toCharacter();
    this.secondAtomResidueSequenceNumber = new Snippet(rawData, 66, 69).toInteger();
    this.secondAtomCodeForInsertionsOfResidue = new Snippet(rawData, 70, 70).toCharacter();
  }
}
