import classes from './Footer.module.css';

const Footer = (props) => {
  const cssClass = `${classes.footer} ${
    props.className ? props.className : ''
  }`;

  return (
    <div className={cssClass}>
      <span>
        Experimental PDB Protein viewer, adapted by John-Paul Holt using&nbsp;
        <a rel="noreferrer" href="https://threejs.org/" target="_blank">
          three.js
        </a>
        .
      </span>
      <span>
        <a
          rel="noreferrer"
          href="https://github.com/vanillabeach/pdb-concept"
          target="_blank"
        >
          GitHub Repo
        </a>
      </span>
    </div>
  );
};

export default Footer;
