import React from 'react';

import { Logo } from './styles';
import burgerLogo from '../../assets/images/original.png';


const logo = (props) => (
  <Logo>
    <img src={burgerLogo} alt="MyBurger" />
  </Logo>
)

export default logo;