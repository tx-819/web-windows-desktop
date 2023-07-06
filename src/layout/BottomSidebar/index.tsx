import Windows from "@/components/Windows";

const BottomSidebar = () => {
  return (
    <div className="z-20 flex items-center justify-between h-10 bg-neutral-900">
      <div className="h-full">
        <Windows />
      </div>
    </div>
  );
};

export default BottomSidebar;
