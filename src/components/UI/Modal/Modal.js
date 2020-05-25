import React, { Component } from 'react';

import { ModalContent } from './styles';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxliary/Aux';

class Modal extends Component {

  shouldComponentUpdate(nextProps, _nextState) {
    return nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children;
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <ModalContent visible={this.props.show}>
          {this.props.children}
        </ModalContent>
      </Aux>
    )
  }
};

export default Modal;