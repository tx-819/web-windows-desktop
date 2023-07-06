import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { createPortal } from "react-dom";
import { Resizable } from "react-resizable";

export type ModalProps = {
  id: string;
  onClose?: (id: string) => void;
  width?: number;
  height?: number;
  onResize?: any;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, id, width = 300, height = 150, onResize } = props;

  return (
    <Draggable handle=".handle" defaultPosition={{ x: 300, y: 150 }}>
      <Resizable height={height} width={width} onResize={onResize}>
        <div
          className="fixed top-0 left-0 bg-white"
          style={{ width: width + "px", height: height + "px" }}
          onContextMenu={(e) => {
            e.stopPropagation();
          }}
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
        </div>
      </Resizable>
    </Draggable>
  );
};

const Portal = (props: ModalProps) => {
  return createPortal(<Modal {...props} />, document.body);
};

export default Portal;
