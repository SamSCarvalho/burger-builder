import React, { useEffect, useState } from "react";

import Aux from "../../hoc/Auxliary/Auxliary";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const getPurchaseState = () => {
    const { ings } = props;
    const sum = Object.keys(ings)
      .map((igKey) => ings[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => setPurchasing(false);

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disbaledInfo = {
    ...props.ings,
  };

  for (let key in disbaledInfo) {
    disbaledInfo[key] = disbaledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? (
    <p style={{ textAlign: "center", fontSize: 20 }}>
      Ingredients can't be loaded!
    </p>
  ) : (
    <Spinner />
  );

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BurgerControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disbaledInfo}
          price={props.price}
          purchasable={getPurchaseState}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));
