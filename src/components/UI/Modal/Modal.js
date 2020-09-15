import React from "react";

import { ModalContent } from "./styles";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxliary/Auxliary";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <ModalContent visible={props.show}>{props.children}</ModalContent>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
