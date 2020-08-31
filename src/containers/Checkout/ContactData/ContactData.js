import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import { FormContainer } from './styles';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false,
        valid: false,
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        validation: {
          required: true,
        },
        touched: false,
        valid: false,
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false,
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        validation: {},
        valid: true,
        value: 'fastest',
      }
    },
    formIsValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    const { orderForm } = this.state;
    this.setState({ loading: true })
    const formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);

  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value, orderForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    })

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    })
  }



  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}    
            touched={element.config.touched}
            changed={(event) => this.inputChangedHandler(event, element.id)} />
        ))}
        <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if(this.props.loading) {
      form = <Spinner />
    }

    return (
      <FormContainer>
        <h4>Enter your Contact Data</h4>
        {form}
      </FormContainer>
    )
  }
}

const mapStateToProps = state => (
  {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
)

const mapDispatchToProps = dispatch => (
  {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));