import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { SummaryContainer } from './styles';

const checkoutSummary = (props) => (
  <SummaryContainer>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      type="Danger"
      clicked={props.checkoutCancelled}>
      CANCEL
    </Button>
    <Button
      type="Success"
      clicked={props.checkoutContinued}>
      CONTINUE
    </Button>
  </SummaryContainer>
);

export default checkoutSummary;