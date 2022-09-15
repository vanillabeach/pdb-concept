import classes from './Header.module.css';
import AnimationIcon from '../ui/AnimationIcon';
import Logo from './Logo';
import FileDrop from '../ui/FileDrop';

const Header = (props) => {
  const cssClass = `${classes.header} ${
    props.className ? props.className : ''
  }`;

  return (
    <div className={cssClass}>
      <span className={classes.drop}>
        <Logo className={classes.logo} />
        <div>Protein Database Concept</div>
        <FileDrop updatePdbDataHandler={props.updatePdbDataHandler} />
      </span>
      <span className={classes.controls}>
        <AnimationIcon
          onClick={props.toggleAutoRotation}
          isAutoRotating={props.isAutoRotating}
        />
      </span>
    </div>
  );
};

export default Header;
