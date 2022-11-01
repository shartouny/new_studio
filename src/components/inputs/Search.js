// Packages
import React from "react"

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"
function Search(props) {
  const { placeholder, handleSearchChange, className, inputClassName, value } =
    props
  return (
    <div
      className={`border border-purple2B3377 rounded-md flex items-stretch justify-center ${className}`}
    >
      <SearchIcon className="my-2.5 ml-2.5" />
      <div className="w-full ">
        <input
          className={`font-Rubik h-full  italic text-purple2B3377 text-base outline-none w-full   placeholder-purple2B3377 ${inputClassName}`}
          onChange={handleSearchChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  )
}

export default Search
