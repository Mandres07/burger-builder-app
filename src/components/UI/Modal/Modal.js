import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = props => {
   return (
      <Auxiliary>
         <Backdrop show={props.show} dismiss={props.modalClosed} />
         <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}>
            {props.children}
         </div>
      </Auxiliary>
   );
}

// React.memo() como segundo parametro recibe una funcion que recibe el prevProps y el nextProp y hay que verifiar si los props son iguales y retornr true or false
export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);