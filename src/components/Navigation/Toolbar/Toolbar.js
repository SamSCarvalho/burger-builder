import React from 'react';

import {
  Toolbar,
  LogoContainer,
  DesktopOnlyNav
} from './styles';
import Logo from '../../Logo/Logo';
import NavigationItens from '../NavigationItens/NavigationItens';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <Toolbar>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <DesktopOnlyNav>
      <NavigationItens />
    </DesktopOnlyNav>
  </Toolbar>
);

export default toolbar;