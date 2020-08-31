import React from 'react';

import { SideContainer, LogoContainer } from './styles';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItens/NavigationItens';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxliary/Auxliary';

const sideDrawer = (props) => (
  <Aux>
    <Backdrop show={props.open} clicked={props.closed} />
    <SideContainer className={props.open ? "Open" : "Close"} onClick={props.closed}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <nav>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </SideContainer>
  </Aux>
);

export default sideDrawer;