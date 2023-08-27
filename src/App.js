import React, { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

function App() {
  const [theme, setTheme] = useState(null);

  const url =
    //For Dark theme switcher
    useEffect(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="App">
      <Header handleThemeSwitch={handleThemeSwitch} />
      <div className="flex items-center justify-center h-screen pb-24 dark:bg-[#1a1a1b]">
        <h1 className="text-white">Hello</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
