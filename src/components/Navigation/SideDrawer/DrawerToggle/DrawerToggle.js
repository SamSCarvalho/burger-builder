import React from 'react';

import { HamburgerMenu } from './styles';

const drawerToggle = (props) => (
  <HamburgerMenu onClick={props.clicked}>
    <div />
    <div />
    <div />
  </HamburgerMenu>
)

export default drawerToggle;