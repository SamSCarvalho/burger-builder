import React from 'react';

import { Navs } from './styles';
import NavigatioItem from './NavigationItem/NavigationItem';

const navigationItens = (props) => (
  <Navs>
    <NavigatioItem link="/" exact>Burger Builder</NavigatioItem>
    <NavigatioItem link="/orders">Orders</NavigatioItem>
  </Navs>
)

export default navigationItens;