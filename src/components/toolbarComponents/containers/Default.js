//Packages
import React from "react"

//Assets
import { ReactComponent as Duplicate } from "@Assets/icons/copy.svg"
import { ReactComponent as Lock } from "@Assets/icons/lock.svg"
import { ReactComponent as Unlock } from "@Assets/icons/unlock.svg"
import { ReactComponent as DeleteIcon } from "@Assets/icons/delete.svg"

function DefaultToolbar(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleClickIcon,
    sharedStyling
  } = props
  return (
    <div className="flex flex-wrap justify-center items-center   h-16 ">
      <div className="flex  h-full">
        {!sharedStyling.lock && (
          <div
            className="mx-4 flex flex-col  justify-center items-center "
            onClick={() => {
              handleClickIcon("duplicate")
            }}
            onMouseOut={handleMouseOut}
            onMouseOver={() => handleMouseOver("duplicate")}
          >
            <Duplicate className={`fill-selected cursor-pointer `} />
            <div
              className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
                horizontalHover === "duplicate"
                  ? `text-purple2B3377`
                  : `text-transparent `
              }`}
            >
              <div className="relative top-6">Duplicate</div>
            </div>
          </div>
        )}
        <div
          className="mx-4 flex flex-col  justify-center items-center "
          onClick={() => {
            handleClickIcon("lock")
          }}
          onMouseOut={handleMouseOut}
          onMouseOver={() => handleMouseOver("lock")}
        >
          {sharedStyling.lock ? (
            <Unlock className={`fill-selected cursor-pointer `} />
          ) : (
            <Lock className={`fill-selected cursor-pointer `} />
          )}
          <div
            className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
              horizontalHover === "lock"
                ? `text-purple2B3377`
                : `text-transparent`
            }`}
          >
            <div className="relative top-6">
              {sharedStyling.lock ? "Unlock" : "Lock"}
            </div>
          </div>
        </div>
        {!sharedStyling.lock && (
          <div
            className="mx-4 flex flex-col  justify-center items-center "
            onClick={() => {
              handleClickIcon("delete")
            }}
            onMouseOut={handleMouseOut}
            onMouseOver={() => handleMouseOver("delete")}
          >
            <DeleteIcon className={` fill-selected cursor-pointer `} />
            <div
              className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
                horizontalHover === "delete"
                  ? `text-purple2B3377`
                  : `text-transparent`
              }`}
            >
              <div className="relative top-6">Delete</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DefaultToolbar
