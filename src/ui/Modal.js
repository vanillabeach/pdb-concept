import { Fragment } from 'react';
import { elements } from '../pdb/periodic_table';
import classes from './Modal.module.css';

const getElementData = (name) => elements.filter(x => x.symbol.toLowerCase() === name.toLowerCase())[0];

const Modal = (props) => {
  const { modalData, onClose } = props;

  const backgroundCss = modalData === null ?
    classes.background :
    [classes.background, classes.show].join(' ');

  const elementData = modalData === null ? {} :
    getElementData(modalData.getElement());

  const elementDataRows = Object.keys(elementData).map(key => {
    const keyName = key.toLowerCase();
    if (keyName.startsWith('bohr') ||
      keyName.startsWith('source') ||
      keyName.startsWith('spectral') ||
      keyName.startsWith('summary')) {
      return null;
    }

    return (
      <tr key={key} className={classes.tr}>
        <td className={classes.td}>
          {key.toLowerCase().replace(/_/gi, ' ')}
        </td >
        <td className={classes.td}>{elementData[key]}</td>
      </tr>
    );
  });

  return (
    <div className={backgroundCss}>
      <section className={classes.content}>
        {modalData && (
          <Fragment>
            <header className={classes.header}>
              <button onClick={onClose} className={classes.close}>
                ✖
              </button>
              <h1>
                Atom information
              </h1>
            </header>
            <article className={classes.article}>
              <table className={classes.table}>
                <tbody>
                  <tr className={`${classes.td} ${classes.title}`}>
                    <td className={classes.title} colSpan="2">
                      Protein Relationship
                    </td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>Serial Number</td>
                    <td className={classes.td}>{modalData.serialNumber}</td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>Chemical Element</td>
                    <td className={classes.td}>{modalData.name}</td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>Occupancy</td>
                    <td className={classes.td}>{modalData.occupancy}</td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>X Orthogonal c/o</td>
                    <td className={classes.td}>
                      {modalData.xOrthogonalCoordinate}
                    </td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>Y Orthogonal c/o</td>
                    <td className={classes.td}>
                      {modalData.yOrthogonalCoordinate}
                    </td>
                  </tr>
                  <tr className={classes.tr}>
                    <td className={classes.td}>Z Orthogonal c/o</td>
                    <td className={classes.td}>
                      {modalData.zOrthogonalCoordinate}
                    </td>
                  </tr>
                  <tr className={`${classes.td} ${classes.title}`}>
                    <td className={classes.title} colSpan="2">
                      &nbsp;
                    </td>
                  </tr>
                  <tr className={`${classes.td} ${classes.title}`}>
                    <td className={classes.title} colSpan="2">
                      Element Information
                    </td>
                  </tr>
                  {elementDataRows}
                </tbody>
              </table>
            </article>
          </Fragment>
        )}
      </section>
    </div>
  );
};

export default Modal;
