import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { createPortal } from "react-dom";
import React from "react";
import Resizable from "@/components/Resizable";

export type ModalProps = {
  id: string;
  onClose?: (id: string) => void;
  modalSize?: { width: number; height: number };
  modalPosition?: { x: number; y: number };
  onResize?: (
    size: { width: number; height: number },
    position?: { x: number; y: number }
  ) => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, id, onResize, modalSize, modalPosition } = props;
  return (
    <Draggable
      handle=".handle"
      position={modalPosition}
      onDrag={(e, position) => {
        const { x, y } = position;
        onResize && modalSize && onResize(modalSize, { x, y });
      }}
    >
      <div
        className="fixed top-0 left-0 bg-white box-container"
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
      >
        <Resizable
          width={modalSize?.width}
          height={modalSize?.height}
          onResize={onResize}
        >
          <div className="flex items-center justify-between handle">
            <div>文件夹</div>
            <div>
              <IconButton
                onClick={() => {
                  onClose && onClose(id);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

const Portal = (props: ModalProps) => {
  return createPortal(<Modal {...props} />, document.body);
};

export default Portal;
