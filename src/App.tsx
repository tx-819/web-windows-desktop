import BottomSidebar from "./layout/BottomSidebar";
import Content from "./layout/Content";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Content />
      <BottomSidebar />
    </div>
  );
}

export default App;
