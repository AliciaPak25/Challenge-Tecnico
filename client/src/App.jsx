import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App  bg-[#cfb9c6] overflow-hidden w-full">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;

/* bg-[#f2f2f2] */
