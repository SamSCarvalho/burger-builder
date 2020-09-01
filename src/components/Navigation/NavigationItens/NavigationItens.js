import React from 'react';

import { Navs } from './styles';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItens = (props) => (
  <Navs>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </Navs>
)

export default navigationItens;