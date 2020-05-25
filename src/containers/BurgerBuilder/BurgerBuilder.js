import React, { Component } from 'react';

import Aux from '../../hoc/Auxliary/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://burger-builder-react-1fbf5.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(_error => {
        this.setState({
          error: true
        })
      })
  }


  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => (sum + el), 0);
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    this.setState((prevState, _props) => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENTS_PRICES[type]
      };
    },() => {
      this.updatePurchaseState();
    })
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return false;
    this.setState((prevState, _props) => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] - 1
        },
        totalPrice: prevState.totalPrice - INGREDIENTS_PRICES[type]
      };
    },() => {
      this.updatePurchaseState();
    })
  }

  purchaseHandler = () => (
    this.setState({ purchasing: true })
  )

  purchaseCancelHandler = () => (
    this.setState({ purchasing: false })
  )

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
        '=' +
        encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disbaledInfo = {
      ...this.state.ingredients
    };

    for (let key in disbaledInfo) {
      disbaledInfo[key] = disbaledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ?
      <p style={{ textAlign: 'center', fontSize: 20 }}>Ingredients can't be loaded!</p> :
      <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disbaledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </Aux>
      );

      orderSummary =  <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    if (this.state.loading){
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);