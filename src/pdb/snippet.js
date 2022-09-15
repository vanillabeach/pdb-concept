/**
 * Class for parsing a given column (snippet) in a PDB file and returning it
 * in the correct format.
 */

export default class Snippet {
  #text;

  constructor(rawSnippet, columnStart, columnEnd) {
    this.#text = rawSnippet.substring(columnStart - 1, columnEnd).trim();
  }

  toInteger() {
    return parseInt(this.#text, 10);
  }

  toReal() {
    return parseFloat(this.#text);
  }

  toCharacter() {
    return this.#text.trim().toString();
  }
}
