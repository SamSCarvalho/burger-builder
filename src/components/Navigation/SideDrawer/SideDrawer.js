import React from 'react';

import { SideContainer, LogoContainer } from './styles';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItens/NavigationItens';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxliary/Aux';

const sideDrawer = (props) => (
  <Aux>
    <Backdrop show={props.open} clicked={props.closed} />
    <SideContainer className={props.open ? "Open" : "Close"}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <nav>
        <NavigationItems />
      </nav>
    </SideContainer>
  </Aux>
);

export default sideDrawer;