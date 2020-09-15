import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxliary/Auxliary";
import { Content } from "./styles";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [getShowSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => setShowSideDrawer(false);

  const sideDrawerToggleHandler = () => setShowSideDrawer(!getShowSideDrawer);

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={getShowSideDrawer}
      />
      <Content>{props.children}</Content>
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(layout);
