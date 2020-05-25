import React from 'react';

import Aux from '../../../hoc/Auxliary/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <Button type='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button type='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary;