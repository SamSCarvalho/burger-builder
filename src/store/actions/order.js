import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => (
    {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
);

export const purchaseBurgerFail = (error) => (
    {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
);

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    }
}