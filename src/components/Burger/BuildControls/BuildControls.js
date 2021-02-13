import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   { label: 'Salad', type: "salad" },
   { label: 'Bacon', type: "bacon" },
   { label: 'Cheese', type: "cheese" },
   { label: 'Meat', type: "meat" }
];

const BuildControls = ({ ingredientAdded, ingredientRemoved, disabled, price }) => {
   return (
      <div className={classes.BuildControls}>
         <p>Current Price: <strong>{price.toFixed(2)}</strong> </p>
         {controls.map((control) => <BuildControl key={control.label} label={control.label} disabled={disabled[control.type]} added={() => ingredientAdded(control.type)} removed={() => ingredientRemoved(control.type)} />)}
      </div>
   );
}

export default BuildControls;