import React from 'react';
import classes from './Input.module.css';

const Input = ({ elementType, elementConfig, value, label, onChange, invalid, shouldValidate, touched }) => {
   let inputElement = null;
   let validationError = null;
   const inputClasses = [classes.InputElement];

   if (invalid && shouldValidate && touched) {
      inputClasses.push(classes.Invalid);
      validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
   }

   switch (elementType) {
      case 'input':
         inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={onChange} />;
         break;
      case 'textarea':
         inputElement = <textarea className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={onChange} />;
         break;
      case 'select':
         inputElement = (
            <select className={inputClasses.join(' ')} value={value} onChange={onChange}>
               {elementConfig.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
            </select>
         );
         break;
      default:
         inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={onChange} />;
         break;
   }

   return (
      <div className={classes.Input}>
         <label className={classes.Label}>{label}</label>
         {inputElement}
         {validationError}
      </div>
   );
}

export default Input;