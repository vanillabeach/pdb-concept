import { useRef } from 'react';

import classes from './FileDrop.module.css';

const FileDrop = (props) => {
  const dropRef = useRef();
  const cssClass = `${classes.fileDrop} ${
    props.className ? props.className : ''
  }`;

  const dragOverHandler = (event) => {
    event.preventDefault();

    dropRef.current.classList.add(classes.dragOver);
  };

  const dragLeaveHandler = (event) => {
    event.preventDefault();

    dropRef.current.classList.remove(classes.dragOver);
  };

  const dropHandler = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) {
      return;
    }

    // TODO: Check file suffix (.endsWidth method not supported in this version of JS)
    // const fileName = file.name.toLowerCase().toString();
    // const suffix = ".pdb";

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (props.updatePdbDataHandler) {
        props.updatePdbDataHandler(content);
      }
      dropRef.current.classList.remove(classes.dragOver);
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={cssClass}
      ref={dropRef}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      Drop a PDB File here (Molecules work best)
    </div>
  );
};

export default FileDrop;
