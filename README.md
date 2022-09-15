<div>
  <span>
    <img src="https://github.com/vanillabeach/lyra/blob/main/metadata/screenshot_1.png" width="256"/>
  </span>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <span>
    <img src="https://github.com/vanillabeach/lyra/blob/main/metadata/screenshot_2.png" width="256"/>
  </span>
</div>

# Protein Database Concept

## Introduction

This is an early-stage project aimed at providing a comprehensive set of libraries to parse and
visualise molecules (including biomolecules) obtained from the PDB format.

The demo can currently renders most standard molecules (caffeine, ethanol, paracetamol, etc), and future versions will be able to render more complex proteins that require helix views, etc.

## Installation

1. Make sure you have node/npm install.
2. Clone this repo to your computer e.g. `$ git clone https://github.com/vanillabeach/lyra.git`
3. Run `$ npm install` to auto install the libraries.
4. Once Step 3 is completed, run `$ npm start` to start the web app.
5. Open your browser to `http://localhost:3000`
6. Alternatively, run `$ npm run build` to build an optimised, static version of the site.

## TODOs

- Add additional 3d support for protein-specific PDB chains:
  - Helix
  - Sheet
  - SSBond

## Acknowledgements

- This project started off an exploration of the ThreeJS [Molecules](https://threejs.org/examples/?q=pdb#webgl_loader_pdb) experiment.
- The logo used was obtained from the [SVG Repo](https://www.svgrepo.com/svg/142619/molecule) website.
- The project also uses the [Open Source Periodic Table](https://github.com/Bowserinator/Periodic-Table-JSON).
