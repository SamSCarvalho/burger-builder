import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { FormContainer } from './styles';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

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

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const { value } = event.target;
    const { controls } = this.state;
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true
      })
    });
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

    let authRedirect = null;

    if (this.props.isAutheticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <FormContainer>
        {authRedirect}
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
    error: state.auth.error,
    isAutheticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
)

const mapDispatchToProps = dispatch => (
  {
    onAuth: (email, password, isSignup) => dispatch(
      actions.auth(email, password, isSignup)
    ),
    onSetAuthRedirectPath: () => dispatch(
      actions.setAuthRedirectPath('/')
    )
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Auth);