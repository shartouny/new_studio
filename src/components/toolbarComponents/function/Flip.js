//Packages
import React from "react"

//Assets
import { ReactComponent as FlipIcon } from "@Assets/toolbarIcons/flip.svg"

function Flip(props) {
  const { horizontalHover, handleMouseOut, handleMouseOver, handleClickIcon } =
    props
  // const [hover, setHover] = useState(-1)

  // const handleChangeMouseOver = (index) => {
  //   setHover(index)
  // }
  return (
    <div className="flex justify-center h-full items-center ">
      <div
        className="  flex flex-col justify-center items-center"
        onClick={() => handleClickIcon("flipHorizontal")}
        onMouseOut={handleMouseOut}
        onMouseOver={() => handleMouseOver("flipHorizontal")}
      >
        <FlipIcon className="fill-selected cursor-pointer transform rotate-90  mx-4" />
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "flipHorizontal"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Flip H.</div>
        </div>
      </div>
      <div
        className="  flex flex-col justify-center items-center"
        onClick={() => handleClickIcon("flipVertical")}
        onMouseOut={handleMouseOut}
        onMouseOver={() => handleMouseOver("flipVertical")}
      >
        <FlipIcon className="fill-selected cursor-pointer  mx-4" />
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "flipVertical"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Flip V.</div>
        </div>
      </div>
    </div>
  )
}

export default Flip
