import Draggable from "react-draggable";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { createPortal } from "react-dom";

export type ModalProps = {
  id: string;
  onClose?: (id: string) => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, id } = props;

  return (
    <Draggable handle=".handle" defaultPosition={{ x: 300, y: 150 }}>
      <div
        className="fixed top-0 left-0 w-2/4 bg-white h-1/3"
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
    </Draggable>
  );
};

const Portal = (props: ModalProps) => {
  return createPortal(<Modal {...props} />, document.body);
}

export default Portal
