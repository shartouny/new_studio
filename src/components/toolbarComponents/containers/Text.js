//Packages
import React from "react"

//Assets
import { ReactComponent as Divider } from "../../../assets/toolbarIcons/divider.svg"

import FontFamily from "@Components/toolbarComponents/function/FontFamily"
import FontSize from "@Components/toolbarComponents/function/FontSize"
import ColorPicker from "@Components/toolbarComponents/function/ColorPicker"
import Bold from "@Components/toolbarComponents/function/Bold"
import Italic from "@Components/toolbarComponents/function/Italic"
import Underline from "@Components/toolbarComponents/function/Underline"
import Capitalize from "@Components/toolbarComponents/function/Capitalize"
import TextAlign from "@Components/toolbarComponents/function/TextAlign"
import LetterSpacing from "@Components/toolbarComponents/function/LetterSpacing"
import LineHeight from "@Components/toolbarComponents/function/LineHeight"

//Utils
import {
  handleTextFormate,
  handleCapitalize,
  handleTextAlignment,
  handleLetterSpacing,
  handleLineHeight,
  handleFontSize
} from "@Utils/topBarTools/textToolBar/TextToolBar"
import { handleChangeColor } from "@Utils/topBarTools/changeColor/ChangeColor"

function TextToolbar(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    viewSettings,
    fontFamily,
    settingsFunctionality,
    canvas,
    // elementSelectedColor,
    textStyle,
    setTextStyle,
    setTextFormate,
    textFormate
  } = props

  return (
    <div className="flex flex-wrap    justify-end items-center    ">
      <FontFamily
        fontFamily={fontFamily}
        settingsFunctionality={settingsFunctionality}
        viewSettings={viewSettings}
      />
      <FontSize
        handleFontSize={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              fontSize: value
            }
          })
          handleFontSize(canvas, value)
        }}
        textStyle={textStyle}
      />
      <ColorPicker
        colorValue={textStyle.color}
        handleChangeColor={(color) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              color: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
            }
          })
          handleChangeColor(canvas, "", color.rgb, "custome color")
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
      />
      <Bold
        handleBold={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              fontWeight: !prev.fontWeight
            }
          })
          handleTextFormate(canvas, value, "bold", setTextFormate)
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />
      <Italic
        handleItalic={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              fontStyle: !prev.fontStyle
            }
          })
          handleTextFormate(canvas, value, "italic", setTextFormate)
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />

      <Underline
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        handleUnderLine={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              underline: !prev.underline
            }
          })

          handleTextFormate(canvas, value, "underline", setTextFormate)
        }}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />
      <Capitalize
        handleCapitalize={() => {
          setTextStyle((prev) => {
            return {
              ...prev,
              capitalize: !prev.capitalize
            }
          })
          handleCapitalize(canvas, textFormate.isCapitalize, setTextFormate)
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />
      <Divider />
      <TextAlign
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        handleTextAlignment={(action) => handleTextAlignment(canvas, action)}
        horizontalHover={horizontalHover}
        setTextStyle={setTextStyle}
        textStyle={textStyle}
      />
      <Divider />
      <LetterSpacing
        handleLetterSpacing={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              letterSpacing: value
            }
          })
          handleLetterSpacing(canvas, value)
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />
      <LineHeight
        handleLineHeight={(value) => {
          setTextStyle((prev) => {
            return {
              ...prev,
              lineSpacing: value
            }
          })
          handleLineHeight(canvas, value)
        }}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        textStyle={textStyle}
      />
      {/* <BulletPoints
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        // handleBulletPoint={() => handleBulletPoint(canvas, "diamond")}
      /> */}
      {/* <TextEffect
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        viewSettings={viewSettings}
      /> */}
      <Divider />
    </div>
  )
}

export default TextToolbar
