import React, { Component } from 'react';

import Aux from '../../hoc/Auxliary/Auxliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  getPurchaseState = () => {
    const { ings } = this.props;
    const sum = Object.keys(ings)
      .map(igKey => ings[igKey])
      .reduce((sum, el) => (sum + el), 0);
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => (
    this.setState({ purchasing: false })
  )

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disbaledInfo = {
      ...this.props.ings
    };

    for (let key in disbaledInfo) {
      disbaledInfo[key] = disbaledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ?
      <p style={{ textAlign: 'center', fontSize: 20 }}>Ingredients can't be loaded!</p> :
      <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.props.ings} />
          <BurgerControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disbaledInfo}
            price={this.props.price}
            purchasable={this.getPurchaseState()}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      );

      orderSummary =  <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
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

const mapStateToProps = state => (
  {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
)

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: (ingName) => dispatch(
      actions.addIngredient(ingName)
    ),
    onIngredientRemoved: (ingName) => dispatch(
      actions.removeIngredient(ingName)
    ),
    onInitIngredients: () => dispatch(
      actions.initIngredients()
    ),
    onInitPurchase: () => dispatch(
      actions.purchaseInit()
    ),
    onSetRedirectPath: (path) => dispatch(
      actions.setAuthRedirectPath(path)
    )
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));