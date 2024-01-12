import ChatIcon from "../assets/icons/Chat";

const Sidebar = () => {
  return (
    <aside className="border-l shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <nav className="h-full flex flex-col bg-[#f3f4f6] border-r shadow-sm">
        <ul className="flex-1 px-3 mt-3">
          <li
            className={`relative flex items-center p-4 my-1 font-medium rounded-md cursor-pointer transition-colors bg-gradient-to-tr from-[#d78ab3] to-[#f2dadf] text-white shadow-[0_3px_10px_#f2dadf] w-60 h-14 mt-5`}
          >
            <ChatIcon className="ml-1" />
            <span className="ml-3 font-semibold text-sm">CUX</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
