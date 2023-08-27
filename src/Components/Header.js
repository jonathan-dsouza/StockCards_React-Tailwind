import React from "react";

export const Header = ({ handleThemeSwitch }) => {
  return (
    <header>
      <nav className="bg-white shadow-lg px-4 py-5 lg:px-6 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              📈 Stock Widget
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <span className="self-center text-md font-normal whitespace-nowrap px-3 dark:text-white">
              Switch Theme :
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={handleThemeSwitch}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};
