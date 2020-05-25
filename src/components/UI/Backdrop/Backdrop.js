import React from 'react';

import { Backdrop } from './styles';


const backdrop = (props) => (
  props.show ? <Backdrop onClick={props.clicked}></Backdrop> : null
);

export default backdrop;