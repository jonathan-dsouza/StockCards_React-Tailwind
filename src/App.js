import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { SearchBar } from "./Components/SearchBar";
import { BasicInfo } from "./Components/BasicInfo";
import { Error } from "./Components/Error";
import { RefreshButton } from "./Components/RefreshButton";

function App() {
  const [stockData, setStockData] = useState({});
  const [companySymbol, setCompanySymbol] = useState("");
  const [symbolRef, setSymbolRef] = useState("");
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(null);
  const [isRotating, setIsRotating] = useState(false);

  // const finnhub_url = `https://finnhub.io/api/v1/search?q=appleinc&token=${process.env.REACT_APP_FINNHUB_KEY}`;

  // const polygon_url = `https://api.polygon.io/v1/open-close/${companySymbol}/2023-08-25?adjusted=true&apiKey=${process.env.REACT_APP_POLYGON_KEY}`;

  // const alphaVantage_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${companySymbol}&interval=5min&apikey=${process.env.REACT_APP_ALPHAVANTAGE_KEY}
  // `;

  const iex_url = `https://cloud.iexapis.com/stable/stock/${symbolRef}/batch?types=quote,company,chart&range=5d&token=${process.env.REACT_APP_IEX_KEY}`;

  const searchCompany = (event) => {
    if (event.key === "Enter") {
      axios
        .get(iex_url)
        .then((response) => {
          setStockData(response.data);
          console.log(response.data);
          setError(false);
          setCompanySymbol("");
        })
        .catch((error) => {
          console.log(error);
          setStockData({});
          setError(true);
          setCompanySymbol("");
        });
    }
  };

  const handleSearch = (event) => {
    setCompanySymbol(event.target.value);
    setSymbolRef("");
    setSymbolRef(event.target.value);
  };

  const refreshData = () => {
    console.log("Refreshing");
    setIsRotating(true);

    axios
      .get(iex_url)
      .then((response) => {
        setStockData(response.data);
        console.log(response.data);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setStockData({});
        setError(true);
      });

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
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
      <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <div className="flex items-center justify-center h-screen pb-24 dark:bg-[#1a1a1b] ">
        <div className="card-container p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-black dark:border-none ">
          {stockData.quote ? (
            <div className="flex justify-between">
              <SearchBar
                companyName={companySymbol}
                handleSearch={handleSearch}
                searchCompany={searchCompany}
              />
              {stockData.quote && (
                <RefreshButton
                  refreshData={refreshData}
                  isRotating={isRotating}
                  theme={theme}
                />
              )}
            </div>
          ) : (
            <SearchBar
              companyName={companySymbol}
              handleSearch={handleSearch}
              searchCompany={searchCompany}
            />
          )}

          {error && <Error />}
          <BasicInfo stockData={stockData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
