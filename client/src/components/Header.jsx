import logo from "../assets/cux-logo.svg";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-b h-20 px-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="flex w-1/3 justify-start">
        <img
          src={logo}
          alt="Logo de CUX"
          title="Logo de CUX"
          className="h-10"
        />
      </div>
      <div className="flex w-1/3 justify-center items-center">
        <h2 className="font-semibold text-xl border-gray-300">Chat</h2>
      </div>
      <div className="flex w-1/3 justify-end">
        <p className="font-bold">Alicia Pak</p>
      </div>
    </header>
  );
};

export default Header;
