<div>
  <span>
    <img src="https://raw.githubusercontent.com/vanillabeach/pdb-concept/main/metadata/screenshot_1.png" width="256"/>
  </span>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <span>
    <img src="https://raw.githubusercontent.com/vanillabeach/pdb-concept/main/metadata/screenshot_2.png" width="256"/>
  </span>
</div>

# Protein Data Bank Concept

➜ <a href="https://jpholt.dev/portfolio/pdb-concept/" target="_blank">Click here to see live website example</a>

## Introduction

This is an early-stage project aimed at providing a comprehensive set of libraries to parse and
visualise molecules (including biomolecules) obtained from the PDB format.

The demo currently renders most standard molecules (caffeine, ethanol, paracetamol, etc), and future versions will be able to render more complex proteins that require helix views, etc. There is also support for hovering over individual atoms and connectors, as well as selecting and viewing data for a given atom. Future versions
will also allow for data to be associated with each element.

## Installation

1. Make sure you have [node/npm](https://nodejs.org/en/download/) installed.
2. Clone this repo to your computer e.g. `$ git clone https://github.com/vanillabeach/pdb-concept.git`
3. Run `$ npm install` to auto install the libraries.
4. Once Step 3 is completed, run `$ npm start` to start the web app.
5. Open your browser to `http://localhost:3000`
6. Alternatively, run `$ npm run build` to build an optimised, static version of the site.

## Viewing PDB files

1. Make sure your PDB file is correctly formatted to the Protein Data Bank standard. 
  * I recommend using 
the [PDBe](https://www.ebi.ac.uk/pdbe/entry/search/index/?advancedSearch%3Atrue) website. It has a 
sidebar with a [download option](https://github.com/vanillabeach/pdb-concept/blob/main/metadata/help/readme/pdbe_download_panel.png) for PDB files. 
  * You can also find some in the [examples/](https://github.com/vanillabeach/pdb-concept/tree/main/public/examples) folder in this repository.
2. Drag the file into the [drop zone](https://github.com/vanillabeach/pdb-concept/blob/main/metadata/help/readme/pdb_drop_zone.png) at the top
of the screen.

### TODOs

- Add additional 3d support for protein-specific PDB chains:
  - Helix
  - Sheet
  - SSBond

## Acknowledgements

- This project started off an exploration of the ThreeJS [Molecules](https://threejs.org/examples/?q=pdb#webgl_loader_pdb) experiment.
- The logo used was obtained from the [SVG Repo](https://www.svgrepo.com/svg/142619/molecule) website.
- The project also uses the [Open Source Periodic Table](https://github.com/Bowserinator/Periodic-Table-JSON).
