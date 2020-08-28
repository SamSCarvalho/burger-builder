import React from 'react';

import { Navs } from './styles';
import NavigatioItem from './NavigationItem/NavigationItem';

const navigationItens = (props) => (
  <Navs>
    <NavigatioItem link="/" exact>Burger Builder</NavigatioItem>
    {props.isAuthenticated ? <NavigatioItem link="/orders">Orders</NavigatioItem> : null}
    {!props.isAuthenticated
      ? <NavigatioItem link="/auth">Authenticate</NavigatioItem>
      : <NavigatioItem link="/logout">Logout</NavigatioItem>
    }
  </Navs>
)

export default navigationItens;