import Windows from "@/components/Windows";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectWindowsMenuOpen,
  toggleMenu,
} from "@/store/windowsMenu/windowsMenuSlice";

const BottomSidebar = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectWindowsMenuOpen);
  return (
    <div className="z-20 flex items-center justify-between h-10 bg-neutral-900">
      <div className="h-full">
        <Windows
          menuOpen={open}
          handleMenuOpen={(menuOpen) => {
            dispatch(toggleMenu({ open: menuOpen }));
          }}
        />
      </div>
    </div>
  );
};

export default BottomSidebar;
