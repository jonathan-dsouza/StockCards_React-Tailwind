import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SearchBar } from "./Components/SearchBar";

function App() {
  const [stockData, setStockData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("");
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(null);

  // const finnhub_url = `https://finnhub.io/api/v1/search?q=appleinc&token=${process.env.REACT_APP_FINNHUB_KEY}`;

  // const polygon_url = `https://api.polygon.io/v1/open-close/${companySymbol}/2023-08-25?adjusted=true&apiKey=${process.env.REACT_APP_POLYGON_KEY}`;

  // const iex_url = `https://cloud.iexapis.com/stable/stock/${companySymbol}/company?token=pk_3d78d3ccc7204f6cbff2e25a47bbc44c`;
  // const iex_url = `https://cloud.iexapis.com/stable/stock/${companySymbol}/chart/5d?token=pk_3d78d3ccc7204f6cbff2e25a47bbc44c`;
  const iex_url = `https://cloud.iexapis.com/stable/stock/${companySymbol}/batch?types=quote,company,chart&range=5d&token=${process.env.REACT_APP_IEX_KEY}`;

  const searchCompany = (event) => {
    if (event.key === "Enter") {
      axios
        .get(iex_url)
        .then((response) => {
          setStockData(response.data);
          console.log(response.data);
          setCompanySymbol("");
        })
        .catch((error) => {
          console.log(error);
          setStockData({});
          setError(true);
        });
    }
  };

  const handleSearch = (event) => {
    setCompanySymbol(event.target.value);
  };

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
        <div class="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-none">
          <SearchBar
            companyName={companySymbol}
            handleSearch={handleSearch}
            searchCompany={searchCompany}
          />
          {stockData.quote && (
            <div className="flex justify-between my-8">
              <div className="mr-10 max-w-[60%]">
                <div>
                  <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {stockData.quote.symbol}
                  </h1>
                </div>
                <div>
                  <h1 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {stockData.quote.companyName}
                  </h1>
                </div>
              </div>
              <div>
                <div>
                  <h1 className="mb-2 text-xl font-semibold text-right tracking-tight text-gray-900 dark:text-white">
                    $ {stockData.quote.close}
                  </h1>
                </div>
                <div>
                  <h1
                    className={`mb-2 text-xl font-semibold tracking-tight ${
                      stockData.quote.changePercent >= 0
                        ? "text-green-500 dark:text-green-500" // Apply green color for positive values
                        : "text-red-500 dark:text-red-500" // Apply red color for negative values
                    } `}
                  >
                    {stockData.quote.changePercent >= 0 ? (
                      <span>
                        <span className="mr-1">&#9650;</span>
                        {(stockData.quote.changePercent * 100).toFixed(2)}%
                      </span>
                    ) : (
                      <span>
                        <span className="mr-1">&#9660;</span>
                        {Math.abs(
                          (stockData.quote.changePercent * 100).toFixed(2)
                        )}
                        %
                      </span>
                    )}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
