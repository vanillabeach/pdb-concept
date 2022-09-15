import classes from './AnimationIcon.module.css';

const AnimationIcon = (props) => {
  const { onClick, isAutoRotating } = props;
  const icon = isAutoRotating ? classes.playIcon : classes.pauseIcon;

  return <div className={icon} onClick={onClick} />;
};

export default AnimationIcon;
