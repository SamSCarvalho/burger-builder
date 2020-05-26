import React, { Component } from 'react';

import Aux from '../../hoc/Auxliary/Auxliary';
import { Content } from './styles';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => (
      {
        showSideDrawer: !prevState.showSideDrawer
      }
    ))
  }

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}/>
        <Content>
          {this.props.children}
        </Content>
      </Aux>
    )
  }
};

export default Layout;