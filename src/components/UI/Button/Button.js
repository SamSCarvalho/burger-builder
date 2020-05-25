import React from 'react';

import {
  Button,
} from './styles';

const button = (props) => (
  <Button className={props.type} onClick={props.clicked}>{props.children}</Button>
)

export default button;