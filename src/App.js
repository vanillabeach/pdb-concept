import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPdbData, structureActions } from './store/structure';

import classes from './App.module.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Modal from './ui/Modal';

import PDBLoader from './three_js/pdb_loader/pdb_loader';
import ProteinViewer from './viewers/ProteinViewer';

import PubSub from 'pubsub-js';

const PROTEIN_CONTEXT = './proteins';
const DEFAULT_PDB_FILE = `${PROTEIN_CONTEXT}/caffeine.pdb`;

const App = (props) => {
  const dispatch = useDispatch();
  const loader = new PDBLoader();
  const pdbData = useSelector((state) => state.structure.pdbData);
  const structuredData = pdbData === null ? null : loader.parse(pdbData);
  const [modalData, setModalData] = useState(null);
  PubSub.unsubscribe('ATOM_SELECT');
  PubSub.subscribe('ATOM_SELECT', (_, data) => {
    setModalData(data);
  });

  const closeModalHandler = () => {
    setModalData(null);
  };

  if (pdbData === null) {
    dispatch(loadPdbData(DEFAULT_PDB_FILE));
  }

  const isAutoRotating = useSelector((state) => {
    return state.structure.autoRotation === true;
  });

  const updatePdbDataHandler = (pdbData) => {
    dispatch(structureActions.updatePdbData(pdbData));
  };

  const toggleAutoRotation = () => {
    dispatch(structureActions.toggleAutoRotation());
  };

  return (
    <div className={classes.container}>
      <Header
        className={classes.header}
        updatePdbDataHandler={updatePdbDataHandler}
        toggleAutoRotation={toggleAutoRotation}
        isAutoRotating={isAutoRotating}
      />
      <Modal
        modalData={modalData}
        onClose={closeModalHandler}
      />
      {structuredData && (
        <ProteinViewer
          className={classes.viewer}
          data={structuredData}
          isAutoRotating={isAutoRotating}
        />
      )}
      <Footer className={classes.footer} />
    </div>
  );
};

export default App;
