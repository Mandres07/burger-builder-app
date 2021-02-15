import React from 'react';
import classes from './Button.module.css';

const Button = ({ click, children, btnType }) => {
   return (
      <button className={[classes.Button, classes[btnType]].join(' ')} onClick={click}>
         {children}
      </button>
   );
};

export default Button;