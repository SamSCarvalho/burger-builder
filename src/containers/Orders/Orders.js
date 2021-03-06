import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    const { token, userId } = this.props;
    this.props.onFetchOrders(token, userId);
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}/>
      )) 
    }
    return(
      <div>
        {orders}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
);

const mapSateToProps = state => (
  {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
)

export default connect(mapSateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));