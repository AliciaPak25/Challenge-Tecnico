import "regenerator-runtime/runtime";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-white overflow-hidden w-full h-screen">
      <Header />

      <div className="flex flex-row container-height">
        <Sidebar />
        <Chat />
      </div>

      <Footer />
    </div>
  );
}

export default App;
