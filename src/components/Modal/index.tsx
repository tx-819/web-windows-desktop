import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { createPortal } from "react-dom";
import { useRef } from "react";
import React from "react";

export type ModalProps = {
  id: string;
  onClose?: (id: string) => void;
  width?: number;
  height?: number;
  onResize?: (size: { width: number; height: number }) => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, id, onResize, width = 300, height = 150 } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Draggable handle=".handle" defaultPosition={{ x: 300, y: 150 }}>
      <div
        className="fixed top-0 left-0 bg-white box-container"
        ref={ref}
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="relative"
          style={{ width: width + "px", height: height + "px" }}
        >
          <div
            className="absolute -right-2 w-4 h-[calc(100%-1rem)] top-2 cursor-ew-resize"
            onMouseDown={() => {
              document.onmousemove = (e) => {
                const left = ref.current?.getBoundingClientRect().left;
                if (ref.current && left) {
                  const { clientX } = e;
                  if (clientX > left) {
                    onResize && onResize({ width: clientX - left, height });
                  }
                }
              };
            }}
            onMouseUp={(e) => {
              document.onmousemove = null;
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
