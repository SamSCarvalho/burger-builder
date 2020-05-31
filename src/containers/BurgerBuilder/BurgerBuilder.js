import React, { Component } from 'react';

import Aux from '../../hoc/Auxliary/Auxliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('https://burger-builder-react-1fbf5.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   })
    //   .catch(_error => {
    //     this.setState({
    //       error: true
    //     })
    //   })
  }


  getPurchaseState = () => {
    const { ings } = this.props;
    const sum = Object.keys(ings)
      .map(igKey => ings[igKey])
      .reduce((sum, el) => (sum + el), 0);
    return sum > 0
  }

  purchaseHandler = () => (
    this.setState({ purchasing: true })
  )

  purchaseCancelHandler = () => (
    this.setState({ purchasing: false })
  )

  purchaseContinueHandler = () => {
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

    let burger = this.state.error ?
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
            ordered={this.purchaseHandler} />
        </Aux>
      );

      orderSummary =  <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
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

const mapStateToProps = state => (
  {
    ings: state.ingredients,
    price: state.totalPrice
  }
)

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
  }
)

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));