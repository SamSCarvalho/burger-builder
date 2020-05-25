import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import { FormContainer, Input } from './styles';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'João da Vila',
        address: {
          street: 'Teststreet 1',
          zipCode: '312124',
          country: 'Brasil'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(_response => {
        this.setState({ loading: false })
        this.props.history.push('/');
      })
      .catch(_error => {
        this.setState({ loading: false })
      });
  }

  render () {
    let form = (
      <form>
        <Input type="text" name="name" placeholder="Your Name" />
        <Input type="text" name="email" placeholder="Your Mail" />
        <Input type="text" name="street" placeholder="Street" />
        <Input type="text" name="postal" placeholder="Postal Code" />
        <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if(this.state.loading) {
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

export default ContactData;