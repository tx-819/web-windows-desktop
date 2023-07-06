import Modal, { ModalProps } from "@/components/Modal";
import React from "react";
import { createPortal } from "react-dom";

export const createModal = (props: ModalProps) => {
  const ModalEl = React.createElement(Modal, props);
  return createPortal(ModalEl, document.body);
};
