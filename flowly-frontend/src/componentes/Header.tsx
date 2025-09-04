import { IoMoonSharp } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa6";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: (isDarkMode: boolean) => void;
}

export const Header = (props: HeaderProps) => {
  const { toggleTheme, isDarkMode } = props;

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-3 font-bold text-2xl">
        <FaMoneyBillWave />
        <span>FLOWLY</span>
      </div>
      <div className="flex items-center gap-2 text-dark-txt">
        <button
          className="flex justify-center items-center rounded-full w-10 h-10 hover:cursor-pointer"
          onClick={() => toggleTheme(!isDarkMode)}
        >
          {!props.isDarkMode ? (
            <IoMoonSharp className="w-6 h-6" />
          ) : (
            <IoSunny className="w-6 h-6" />
          )}
        </button>

        <button className="group relative flex justify-center items-center rounded-full w-10 h-10 hover:cursor-pointer">
          <IoMdNotifications className="w-6 h-6" />
          <span className="top-0.5 right-1 absolute bg-notification px-1.5 py-0.5 rounded-full text-primary-dark text-xs scale-90 group-hover:scale-100">
            3
          </span>
        </button>

        <div className="flex items-center bg-button shadow-shadow ml-2 px-4 py-2 rounded-xl">
          <span className="text-primary-dark text-base">User 123</span>
        </div>
      </div>
    </div>
  );
};
