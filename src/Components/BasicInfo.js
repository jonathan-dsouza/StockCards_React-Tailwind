import React from "react";

export const BasicInfo = ({ stockData }) => {
  return (
    <div>
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
                    {Math.abs((stockData.quote.changePercent * 100).toFixed(2))}
                    %
                  </span>
                )}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
