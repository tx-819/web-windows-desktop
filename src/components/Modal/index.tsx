import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import React from "react";

export type ModalProps = {
  id: string;
  onClose?: (id: string) => void;
  width?: number;
  height?: number;
  onResize?: (size: { width: number; height: number }) => void;
};

let isMouseDown = false;

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, id, width = 300, height = 150, onResize } = props;
  const ref = React.createRef<HTMLDivElement>();

  return (
    <Draggable handle=".handle" defaultPosition={{ x: 300, y: 150 }}>
      <div
        className="fixed top-0 left-0 bg-white"
        style={{ width: width + "px", height: height + "px" }}
        ref={ref}
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative w-full h-full p-2">
          <div
            className="absolute right-0 w-2 h-[calc(100%-1rem)] top-2 cursor-ew-resize"
            onMouseDown={(e) => {
              console.log(e);
              isMouseDown = true;
              console.log(ref.current?.getBoundingClientRect().left);
            }}
            onMouseMove={(e) => {
              if (isMouseDown && ref.current) {
                const left = ref.current?.getBoundingClientRect().left;
                const { clientX } = e;
                if (clientX > left) {
                  onResize && onResize({ width: clientX - left + 4, height });
                }
              }
            }}
            onMouseUp={(e) => {
              console.log(e);
              isMouseDown = false;
            }}
          />
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
        </div>
      </div>
    </Draggable>
  );
};

const Portal = (props: ModalProps) => {
  return createPortal(<Modal {...props} />, document.body);
};

export default Portal;
