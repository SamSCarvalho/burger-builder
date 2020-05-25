import React from 'react';
import { NavLink } from 'react-router-dom';

import { Item } from './styles';

const navigationItem = (props) => (
  <Item>
    <NavLink
      to={props.link}
      exact={props.exact}
      >{props.children}</NavLink>
  </Item>
)

export default navigationItem;