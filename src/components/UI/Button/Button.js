import React from 'react';
import classes from './Button.module.css';

const Button = ({ click, children, btnType, disabled }) => {
   return (
      <button disabled={disabled} className={[classes.Button, classes[btnType]].join(' ')} onClick={click}>
         {children}
      </button>
   );
};

export default Button;