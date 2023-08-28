import React from "react";

export const SearchBar = ({ companyName, handleSearch, searchCompany }) => {
  return (
    <div className=" relative rounded-full overflow-hidden">
      <input
        type="text"
        className="block w-full py-2 px-3  bg-white rounded-full focus:outline-none border dark:border-transparent dark:bg-[#1a1a1b] dark:text-white"
        value={companyName}
        onChange={handleSearch}
        onKeyPress={searchCompany}
        placeholder="Enter Stock Symbol"
      />
    </div>
  );
};
