import React from 'react';
import {
  CardOrder,
  Box
} from './styles';

const order = (props) => {
  const ingredients = [];
  for ( let ingredientName in props.ingredients ) {
    ingredients.push({
      name: ingredientName,
      amout: props.ingredients[ingredientName]
    })
  }

  const ingredientsOutput = ingredients.map(ing => (
    <Box key={ing.name}>{ing.name} ({ing.amout})</Box>
  ))

  return (
    <CardOrder>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </CardOrder>
  );
}

export default order;