import React, { Component } from 'react';
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FormContainer } from './styles';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        validation: {
          required: true,
          minLength: 6
        },
        touched: false,
        valid: false,
      }
    },
    isSignup: true
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;

  }

  inputChangedHandler = (event, controlName) => {
    const { value } = event.target;
    const { controls } = this.state;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: this.checkValidity(value, controls[controlName].validation),
        touched: true
      }
    };
    this.setState({
      controls: updatedControls
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { isSignup } = this.state;
    const { email, password } = this.state.controls;
    this.props.onAuth(email.value, password.value, isSignup);
  }

  switchAuthModeHandler = () => (
    this.setState(prevState => (
      {
        isSignup: !prevState.isSignup
      }
    ))
  )

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}    
        touched={element.config.touched}
        changed={(event) => this.inputChangedHandler(event, element.id)} />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    return (
      <FormContainer>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button type="Success">Submit</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          type="Danger">
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </FormContainer>
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.auth.loading,
    error: state.auth.error
  }
)

const mapDispatchToProps = dispatch => (
  {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Auth);