import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({ show, dismiss }) => (
   show ? <div className={classes.Backdrop} onClick={dismiss}></div> : null
);

export default Backdrop;