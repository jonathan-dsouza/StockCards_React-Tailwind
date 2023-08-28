import React from "react";
import moon from "../Assets/dark_mode_black_24dp.svg";
import sun from "../Assets/light_mode_white_24dp.svg";

export const Header = ({ handleThemeSwitch, theme }) => {
  const handleReload = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <header>
      <nav className="bg-white shadow-lg px-4 py-5 lg:px-6 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center" onClick={handleReload}>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              📈 Stock Widget
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button className={`ml-6`} onClick={handleThemeSwitch}>
              {theme === "dark" ? (
                <img src={sun} alt="light_mode" />
              ) : (
                <img src={moon} alt="dark_mode" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
