//packages
import React, { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Scrollbars } from "react-custom-scrollbars"

//Assets
import { ReactComponent as BackgroundIcon } from "@Assets/icons/background.svg"
import { ReactComponent as ElementsIcon } from "@Assets/icons/elements.svg"
import { ReactComponent as TextIcon } from "@Assets/icons/text.svg"
import { ReactComponent as TemplateIcon } from "@Assets/icons/template.svg"
import { ReactComponent as Tick } from "@Assets/icons/tick.svg"
//import { ReactComponent as PersonalizerIcon } from "@Assets/icons/personalizer.svg"

//Components
import FileUploader from "@Components/inputs/FileUploader"
import Button from "@Components/inputs/Button"
import ImageLoader from "@Components/loader/ImageLoader"
import CategorySeeAll from "@Components/sidebarSettings/CategorySeeAll"
import SeeAll from "@Components/sidebarSettings/SeeAll"
import SettingsColor from "@Components/sidebarSettings/SettingsColor"
import ColorPickerButton from "@Components/inputs/ColorPickerButton"
import Search from "@Components/inputs/Search.js"
import EffectsComponents from "@Components/sidebarSettings/EffectsComponents"
import PersonalizerDropdown from "@Components/inputs/PersonalizerDropdown"

//Data
import Graphics from "@Data/graphics.json"
import LinesAndShapes from "@Data/linesAndShapes.json"
import Photos from "@Data/photos.json"
import Background from "@Data/background.json"
import Wallpapers from "@Data/wallpapers.json"
import Elements from "@Data/elements.json"
import Patterns from "@Data/patterns.json"

//Utils
import { handleLoadElement } from "@Utils/elements/shapes/Shapes"
import { handleUploadImage } from "@Utils/elements/images/UploadImage"
import { handleAddTextBox } from "@Utils/textBox/TextBox"
import { handleBackground } from "@Utils/backgrounds/Background"
import { handleFontFmaily } from "@Utils/topBarTools/textToolBar/TextToolBar"
import { handleFilter } from "@Utils/topBarTools/backgroundToolBar/BackgroundToolBar"
import { handleAddTemplate } from "@Utils/templates/Tamplate"
import {
  handleAddPersonalizerTextBox,
  handleAddPersonalizerImage
} from "@Utils/personalizer/personalizer"

function SideBar(props) {
  const {
    canvas,
    drawRef,
    setAllColors,
    selectedTabIndex,
    isOpenNavigation,
    isOpenSettings,
    openSettings,
    seeAll,
    seeAllCategory,
    hanldeChangeSeeAll,
    hanldeChangeSeeAllCategory,
    handleOpenColorPicker,
    openColorPicker,
    handleTabChosen,
    handleChangeElementColor,
    elementSelectedColor,
    allColors,
    handleChangeSvgColors,
    resetSeeAllFlag,
    resetSeeAllCategoryFlag,
    setLastBackgroundImage,
    settingsFunctionality,
    fontFamily,
    changeFont,
    lastBackgroundImage,
    openBackgroundColorPicker,
    handleOpenBackgroundColorPicker,
    effects,
    setEffects,
    setIsFilterSelected,
    isFilterSelected,
    templateState,
    personalizerLayerList,
    setPersonalizerLayerList,
    selectedObjects,
    setSelectedObjects,
    canvasWidth,
    canvasHeight,
    setNotification
  } = props

  //const [personalizerData, setPersonalizerData] = useState([])

  const [selectedColor, setSelectedColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1"
  })

  const [searchTerm, setSearchTerm] = useState("")

  const [viewedFonts, setViewedFonts] = useState([
    "Times New Roman",
    "Roboto",
    "Montserrat",
    "Lato",
    "Ephesis",
    "Cairo",
    "Caveat",
    "Ceviche One",
    "Dancing Script",
    "Fruktur",
    "Gloria Hallelujah",
    "Great Vibes",
    "Henny Penny",
    "Irish Grover",
    "Lobster",
    "Permanent Marker",
    "Press Start 2P",
    "Qahiri",
    "Righteous",
    "Rubik Beastly",
    "Satisfy",
    "Ubuntu",
    "Zen Antique",
    "Zen Kurenaido",
    "Allerta Stencil",
    "Allura",
    "Audiowide",
    "Birthstone Bounce",
    "Bungee Inline",
    "Covered By Your Grace",
    "Creepster",
    "Fleur De Leah",
    "Fredericka the Great",
    "Grechen Fuemen",
    "Herr Von Muellerhoff",
    "Homemade Apple",
    "Kristi",
    "Kumar One Outline",
    "La Belle Aurore",
    "Major Mono Display",
    "Marck Script",
    "Monoton",
    "Mr Dafoe",
    "Nanum Brush Script",
    "Nothing You Could Do",
    "Pinyon Script",
    "Qwigley",
    "Reenie Beanie",
    "Rock Salt",
    "Six Caps",
    "Titan One",
    "Waiting for the Sunrise"
  ])

  const handleSeeCategoryAllClick = (categorieId) => {
    openSettings()
    hanldeChangeSeeAllCategory(categorieId)
  }
  const handleSeeAllClick = (type, categorieId, categoryName) => {
    if (type === "subCategory") {
      if (searchTerm !== "") {
        openSettings()
      }
      hanldeChangeSeeAll(categorieId, categoryName)
    } else {
      openSettings()
      hanldeChangeSeeAll(categorieId, categoryName)
    }
  }

  const formatter = () => {
    if (seeAll.id == 1) return LinesAndShapes
    if (seeAll.id == 2) return Graphics
    if (seeAll.id == 3) return Photos

    if (seeAll.id == 5) return Patterns
    if (seeAll.id == 6) return Wallpapers
    var dataGraphics
    if (seeAll.id >= 11) {
      dataGraphics = Graphics.data.filter((dd) => dd.subCategoryId == seeAll.id)
      return dataGraphics[0]
    }
  }
  const formatterCategory = () => {
    if (seeAllCategory.id == 2) return Graphics
  }

  const textTypeExample = {
    title: "Teelaunch Studio",
    subheader: "What is teelaunch studio",
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
  }

  const onClickUploadImage = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      handleUploadImage(canvas, img, type, setNotification)
    }
  }

  const fonts = [
    "Times New Roman",
    "Roboto",
    "Montserrat",
    "Lato",
    "Ephesis",
    "Cairo",
    "Caveat",
    "Ceviche One",
    "Dancing Script",
    "Fruktur",
    "Gloria Hallelujah",
    "Great Vibes",
    "Henny Penny",
    "Irish Grover",
    "Lobster",
    "Permanent Marker",
    "Press Start 2P",
    "Qahiri",
    "Righteous",
    "Rubik Beastly",
    "Satisfy",
    "Ubuntu",
    "Zen Antique",
    "Zen Kurenaido",
    "Allerta Stencil",
    "Allura",
    "Audiowide",
    "Birthstone Bounce",
    "Bungee Inline",
    "Covered By Your Grace",
    "Creepster",
    "Fleur De Leah",
    "Fredericka the Great",
    "Grechen Fuemen",
    "Herr Von Muellerhoff",
    "Homemade Apple",
    "Kristi",
    "Kumar One Outline",
    "La Belle Aurore",
    "Major Mono Display",
    "Marck Script",
    "Monoton",
    "Mr Dafoe",
    "Nanum Brush Script",
    "Nothing You Could Do",
    "Pinyon Script",
    "Qwigley",
    "Reenie Beanie",
    "Rock Salt",
    "Six Caps",
    "Titan One",
    "Waiting for the Sunrise"
  ]

  const filters = [
    "None",
    "Grayscale",
    "Sepia",
    "Kodachrome",
    "Technicolor",
    "Polaroid"
  ]

  // const textEffects = [
  //   {
  //     type: "Effects",
  //     data: [
  //       "None",
  //       "Shadow",
  //       "Blur",
  //       "Outline",
  //       "Splice",
  //       "Echo",
  //       "Glitch",
  //       "Neon"
  //     ]
  //   },
  //   {
  //     type: "Shape",
  //     data: ["None", "Curved"]
  //   }
  // ]

  const [personalizerOpen, setPersonalizerOpen] = useState(-1)

  const handleElementsSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchChange = (e) => {
    if (e.target.value === "") setViewedFonts(fonts)
    else setViewedFonts(filterItems(fonts, e.target.value))
  }
  function filterItems(arr, query) {
    return arr.filter(function (el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  const handleTextChange = (e, index) => {
    let currentData = [...personalizerLayerList]
    let data = {}
    if (e.target.id === "textBoxName") {
      data = {
        buttonType: "Text Personalization Layer",
        data: {
          text: e.target.value,
          placeholder: currentData[index].data.data.placeholder
        }
      }
    } else {
      data = {
        buttonType: "Text Personalization Layer",
        data: {
          text: currentData[index].data.data.text,
          placeholder: e.target.value
        }
      }
    }
    currentData[index].data = data
    setPersonalizerLayerList(currentData)
  }
  const handleChangeRadio = (e, index) => {
    let currentData = [...personalizerLayerList]

    let data = {
      buttonType: "Image Personalization Layer",
      data: {
        imageType: e.target.value,
        width: currentData[index].data.data.width,
        height: currentData[index].data.data.height
      }
    }
    currentData[index].data = data
    setPersonalizerLayerList(currentData)
  }

  const handleWidthHeightChange = (e, layer, index) => {
    if (layer.visible) {
      let currentData = [...personalizerLayerList]
      setSelectedObjects(currentData[index])
      let data = {}
      if (e.target.id === "width") {
        data = {
          buttonType: "Image Personalization Layer",
          data: {
            imageType: currentData[index].data.data.imageType,
            width: e.target.value,
            height: currentData[index].data.data.height
          }
        }

        const obj = canvas
          .getObjects()
          .filter((layer) => layer.id === selectedObjects.id)
        obj[0].set({ width: parseInt(e.target.value) })
      } else {
        data = {
          buttonType: "Image Personalization Layer",
          data: {
            imageType: currentData[index].data.data.imageType,
            width: currentData[index].data.data.width,
            height: e.target.value
          }
        }
        const obj = canvas
          .getObjects()
          .filter((layer) => layer.id === selectedObjects.id)

        obj[0].set({ height: parseInt(e.target.value) })
      }
      canvas.renderAll()
      currentData[index].data = data
      setPersonalizerLayerList(currentData)
    }
  }

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#D5D5D5`
    }
    return (
      <div
        className="rounded-xl"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    )
  }

  return (
    <div className="h-full">
      <div className="flex h-full ">
        <div className="w-28 h-full bg-purple1E2351 ">
          <div
            className={`cursor-pointer flex flex-col items-center justify-center h-20 ${
              selectedTabIndex === 0 ? `bg-purple2B3377` : ``
            }`}
            onClick={() => handleTabChosen(0)}
          >
            <ElementsIcon
              className={` my-1 ${
                selectedTabIndex === 0 ? "fill-white" : "fill-darkGray"
              }`}
            />
            <span
              className={`font-medium text-sm font-Rubik ${
                selectedTabIndex === 0 ? "text-white" : "text-darkGray"
              }`}
            >
              Elements
            </span>
          </div>
          <div
            className={`cursor-pointer flex flex-col items-center justify-center h-20 ${
              selectedTabIndex === 1 ? `bg-purple2B3377` : ``
            }`}
            onClick={() => handleTabChosen(1)}
          >
            <TextIcon
              className={` my-1 ${
                selectedTabIndex === 1 ? "fill-white" : "fill-darkGray"
              }`}
            />
            <span
              className={`font-medium text-sm font-Rubik ${
                selectedTabIndex === 1 ? "text-white" : "text-darkGray"
              }`}
            >
              Text
            </span>
          </div>
          <div
            className={`cursor-pointer flex flex-col items-center justify-center h-20 ${
              selectedTabIndex === 2 ? `bg-purple2B3377` : ``
            }`}
            onClick={() => handleTabChosen(2)}
          >
            <BackgroundIcon
              className={` my-1 ${
                selectedTabIndex === 2 ? "fill-white" : "fill-darkGray"
              }`}
            />
            <span
              className={`font-medium text-sm font-Rubik ${
                selectedTabIndex === 2 ? "text-white" : "text-darkGray"
              } `}
            >
              Background
            </span>
          </div>
          <div
            className={`   cursor-pointer flex flex-col items-center justify-center h-20 ${
              selectedTabIndex === 3 ? `bg-purple2B3377` : ``
            }`}
            onClick={() => handleTabChosen(3)}
          >
            <TemplateIcon
              className={`my-1 ${
                selectedTabIndex === 3 ? "fill-white" : "fill-darkGray"
              }`}
            />
            <span
              className={`font-medium text-sm font-Rubik ${
                selectedTabIndex === 3 ? "text-white" : "text-darkGray"
              }`}
            >
              Templates
            </span>
          </div>
          {/* <div
            className={`   cursor-pointer flex flex-col items-center justify-center h-20 ${
              selectedTabIndex === 4 ? `bg-purple2B3377` : ``
            }`}
            onClick={(e) => handleTabChosen(4)}
          >
            <PersonalizerIcon className="fill-white" />
            <span className="font-medium text-sm font-Rubik text-white">
              Personalizer
            </span>
          </div> */}
        </div>
        {isOpenNavigation && (
          <div className="w-80 text-white text-xl h-full bg-purple2B3377">
            {selectedTabIndex === 0 && (
              <div className=" sideBar-scroll-container overflow-y-auto">
                <div
                  className={`flex justify-center items-center py-1.5 ${
                    searchTerm ? "mx-3  mt-3" : "m-3"
                  }`}
                >
                  <Search
                    className="w-full bg-white mr-1"
                    handleSearchChange={handleElementsSearchChange}
                    inputClassName="text-left px-3 rounded-md"
                    placeholder="Search"
                    value={searchTerm}
                  />
                  <FileUploader
                    className=" rounded-md ml-1 bg-white p-2"
                    handleFileUpload={(e) => {
                      onClickUploadImage(e, "normalImage")
                    }}
                    icon="download.svg"
                    id="uploadImage"
                  />
                </div>

                {searchTerm === "" ? (
                  <div>
                    {Elements.map((element, index) => {
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between m-3">
                            <span className="text-lg font-medium">
                              {element.categorieName}
                            </span>
                            {element.data.length > element.panelView && (
                              <span
                                className="text-sm cursor-pointer font-medium"
                                onClick={() =>
                                  element.hasSubCategory
                                    ? handleSeeCategoryAllClick(
                                        element.categorieId
                                      )
                                    : handleSeeAllClick(
                                        "category",
                                        element.categorieId,
                                        element.categorieName
                                      )
                                }
                              >
                                See All
                              </span>
                            )}
                          </div>
                          <div
                            className={`m-3 flex ${
                              element.data.length > element.panelView
                                ? "justify-between"
                                : "justify-start space-x-7"
                            }`}
                          >
                            {element.data
                              .slice(0, element.panelView)
                              .map((elementData, index) => (
                                <ImageLoader
                                  activeAction={() =>
                                    handleLoadElement(
                                      canvas,
                                      elementData,
                                      element,
                                      setAllColors,
                                      canvasWidth
                                    )
                                  }
                                  className={`${
                                    element.panelView === 5
                                      ? `w-12 h-12`
                                      : element.panelView === 4
                                      ? `w-16 h-16`
                                      : `w-20 h-20`
                                  }`}
                                  elementData={elementData}
                                  key={index}
                                />
                              ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div>
                    <CategorySeeAll
                      canvas={canvas}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                      data={{
                        categorieName: "Graphics",
                        categorieId: 2,
                        data: Graphics.data.filter((graphic) =>
                          graphic.subCategoryName
                            .toLowerCase()
                            .startsWith(searchTerm.toLowerCase())
                        )
                      }}
                      handleBackground={(path, action) => {
                        handleBackground(
                          canvas,
                          path,
                          action,
                          setLastBackgroundImage,
                          canvasWidth,
                          canvasHeight
                        )
                        setLastBackgroundImage(path)
                        canvas._historySaveAction()
                      }}
                      handleSeeAllClick={handleSeeAllClick}
                      handleShapeChosen={(elementData, data) =>
                        handleLoadElement(
                          canvas,
                          elementData,
                          data,
                          setAllColors,
                          canvasWidth
                        )
                      }
                      resetSeeAllCategoryFlag={resetSeeAllCategoryFlag}
                      searchView={true}
                    />
                  </div>
                )}
              </div>
            )}
            {selectedTabIndex === 1 && (
              <div className="sideBar-scroll-container overflow-y-auto">
                <div className="flex text-base font-Rubik font-bold justify-center pt-10 pb-3">
                  Click text to add to page
                </div>
                <div className="flex ">
                  <Button
                    className=" rounded-md bg-grayFAFAFA text-purple1E2351  py-1.5 mx-3 mb-1.5 mt-1.5 text-sm font-Rubik font-medium w-full"
                    id="addTitle"
                    label="Add Title"
                    onClick={() =>
                      handleAddTextBox(canvas, "title", textTypeExample.title)
                    }
                  />
                </div>
                <div className="flex ">
                  <Button
                    className=" rounded-md bg-grayFAFAFA text-purple1E2351  py-1.5 mx-3 my-1.5 text-sm font-Rubik font-medium  w-full"
                    id="addSubheader"
                    label="Add a Subheader"
                    onClick={() =>
                      handleAddTextBox(
                        canvas,
                        "subheader",
                        textTypeExample.subheader
                      )
                    }
                  />
                </div>
                <div className="flex ">
                  <Button
                    className=" rounded-md bg-grayFAFAFA text-purple1E2351  py-1.5 mx-3 my-1.5 text-sm font-Rubik font-medium  w-full"
                    id="addBodyText"
                    label="Add Body text"
                    onClick={() =>
                      handleAddTextBox(canvas, "bodyText", textTypeExample.body)
                    }
                  />
                </div>
              </div>
            )}
            {selectedTabIndex === 2 && (
              <div className="sideBar-scroll-container overflow-y-auto">
                <div>
                  <ColorPickerButton
                    className="cursor-pointer m-3"
                    color={selectedColor}
                    handleColorChange={(color) => {
                      setSelectedColor(color.rgb)
                      handleBackground(
                        canvas,
                        color.rgb,
                        "color picker",
                        setLastBackgroundImage
                      )
                      canvas._historySaveAction()
                    }}
                    handleOpenColorPicker={handleOpenBackgroundColorPicker}
                    openColorPicker={openBackgroundColorPicker}
                    type="primary"
                  />
                </div>
                {openBackgroundColorPicker && (
                  <div className="bg-gray-900 bg-opacity-50 absolute w-80 sideBar-scroll-container-overlay  z-20"></div>
                )}
                <div>
                  <div>
                    <div className="m-3 text-lg font-medium">
                      Default Colors
                    </div>
                    <div className="flex flex-wrap m-3">
                      {Background.defaultColors.map((color, index) => (
                        <div
                          className="mx-2 my-1 cursor-pointer"
                          key={index}
                          onClick={() => {
                            handleBackground(
                              canvas,
                              color,
                              "default color",
                              setLastBackgroundImage
                            )
                            canvas._historySaveAction()
                          }}
                        >
                          <div
                            className="rounded-full h-8 w-8 border-0.25 border-grayC4C4C4 "
                            style={{ backgroundColor: color }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {Background.sections.map((background, index) => {
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between m-3">
                            <span className="text-lg font-medium">
                              {background.backgroundCategorieName}
                            </span>
                            {background.data.length > background.panelView && (
                              <span
                                className="text-sm cursor-pointer font-medium"
                                onClick={() =>
                                  background.hasSubCategory
                                    ? handleSeeCategoryAllClick(
                                        background.backgroundCategorieId
                                      )
                                    : handleSeeAllClick(
                                        "category",
                                        background.backgroundCategorieId,
                                        background.backgroundCategorieName
                                      )
                                }
                              >
                                See All
                              </span>
                            )}
                          </div>
                          <div
                            className={`m-3 flex ${
                              background.data.length > background.panelView
                                ? "justify-between"
                                : "justify-start space-x-7"
                            }`}
                          >
                            {background.data
                              .slice(0, background.panelView)
                              .map((backgroundData, index) => (
                                <LazyLoadImage
                                  alt={backgroundData.name}
                                  className={`cursor-pointer rounded-full ${
                                    background.panelView === 5
                                      ? `w-12 h-12`
                                      : background.panelView === 4
                                      ? `w-16 h-16`
                                      : `w-20 h-20`
                                  }`}
                                  effect="blur"
                                  key={index}
                                  onClick={() => {
                                    handleBackground(
                                      canvas,
                                      backgroundData.path,
                                      "image",
                                      setLastBackgroundImage,
                                      canvasWidth,
                                      canvasHeight
                                    )
                                    canvas._historySaveAction()

                                    setLastBackgroundImage(backgroundData.path)
                                    drawRef.current = {}
                                  }}
                                  src={backgroundData.path}
                                  threshold={50}
                                />
                              ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
            {selectedTabIndex === 3 && (
              <div className="sideBar-scroll-container overflow-y-auto">
                <div className="flex text-base font-Rubik font-bold justify-center pt-10 pb-3">
                  Click To choose a template
                </div>

                <div className={` mx-3  grid grid-cols-3`}>
                  {templateState.map((value, index) => {
                    return (
                      <div key={index}>
                        <LazyLoadImage
                          alt={"Template" + value.id}
                          className={` m-2 col-span-1 cursor-pointer rounded-sm w-20 h-20`}
                          effect="blur"
                          onClick={() =>
                            handleAddTemplate(canvas, value.template)
                          }
                          src={value.thumbnailImage}
                          threshold={50}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {selectedTabIndex === 4 && (
              <div className="sideBar-scroll-container overflow-y-auto">
                <div className="flex text-base font-Rubik font-bold justify-center pt-10 pb-3">
                  Click to add personalization
                </div>
                <div className="flex ">
                  <Button
                    className=" rounded-md bg-grayFAFAFA text-purple1E2351 py-1.5 ml-3 mr-1   mt-1.5 text-xs font-Rubik font-medium w-full flex justify-center items-center"
                    icon={"personalizerTextLayer.svg"}
                    id="addTextLayer"
                    label="Add Text Layer"
                    onClick={() => {
                      handleAddPersonalizerTextBox(
                        canvas,
                        "title",
                        "Your Text Here",
                        "Text Personalization Layer",
                        "Text Personalization Layer" +
                          Number(personalizerLayerList.length + 1),
                        {
                          buttonType: "Text Personalization Layer",
                          data: {
                            text: "",
                            placeholder: ""
                          }
                        }
                      )
                    }}
                  />
                  <Button
                    className=" rounded-md bg-grayFAFAFA text-purple1E2351 py-1.5 ml-1 mr-3 mt-1.5 text-xs font-Rubik font-medium  w-full flex justify-center items-center"
                    icon={"personalizerImageLayer.svg"}
                    id="addImageLayer"
                    label="Add Image Layer"
                    onClick={() => {
                      handleAddPersonalizerImage(
                        canvas,
                        "Image Personalization Layer",
                        "Image Personalization Layer" +
                          Number(personalizerLayerList.length + 1),
                        {
                          buttonType: "Image Personalization Layer",
                          data: {
                            imageType: "JPEG",
                            width: 200,
                            height: 200
                          }
                        }
                      )
                    }}
                  />
                </div>
                {personalizerLayerList.map((data, index) => (
                  <PersonalizerDropdown
                    canvas={canvas}
                    handleChangeRadio={handleChangeRadio}
                    handleTextChange={handleTextChange}
                    handleWidthHeightChange={handleWidthHeightChange}
                    index={index}
                    key={index}
                    personalizerLayer={data}
                    personalizerOpen={personalizerOpen}
                    selectedObjects={selectedObjects}
                    setPersonalizerOpen={setPersonalizerOpen}
                    setSelectedObjects={setSelectedObjects}
                  />
                ))}
              </div>
            )}

            {isOpenSettings && (
              <div
                className={`w-80  absolute text-black text-xl z-0 top-0 h-full ${
                  seeAllCategory.visible || seeAll.visible
                    ? "bg-purple2B3377"
                    : "bg-white"
                } pt-14`}
              >
                {!seeAllCategory.visible && !seeAll.visible && (
                  <div>
                    {settingsFunctionality === "fontFamily" && (
                      <div>
                        <div className="mx-3 my-5 ">
                          <Search
                            handleSearchChange={handleSearchChange}
                            inputClassName="text-center rounded-md"
                            placeholder="Search for Font Name"
                          />
                        </div>
                        <Scrollbars
                          autoHeight={true}
                          autoHeightMax={"calc(100vh - 135px)"}
                          renderThumbVertical={renderThumb}
                          universal={true}
                        >
                          {viewedFonts.map((font, index) => (
                            <div
                              className=" m-3   flex items-center justify-between cursor-pointer"
                              key={index}
                              onClick={() => {
                                changeFont(font)
                                handleFontFmaily(canvas, font)
                              }}
                            >
                              <div
                                className="font-normal text-purple2B3377 "
                                style={{ fontFamily: font }}
                              >
                                {font}
                              </div>
                              <div>{fontFamily === font && <Tick />}</div>
                            </div>
                          ))}
                        </Scrollbars>
                      </div>
                    )}

                    {settingsFunctionality === "filters" && (
                      <div>
                        <div className="mx-3 mt-6 mb-5  font-Rubik font-medium text-purple2B3377 text-2xl">
                          Filters
                        </div>
                        <div className="flex items-center justify-start flex-wrap  ">
                          {filters.map((filter, index) => (
                            <div
                              className="flex flex-col justify-center items-center m-3 cursor-pointer"
                              key={index}
                            >
                              <div
                                className="h-20 w-20  rounded-full"
                                onClick={() =>
                                  handleFilter(
                                    canvas,
                                    filter,
                                    lastBackgroundImage,
                                    setIsFilterSelected,
                                    isFilterSelected,
                                    drawRef.current
                                  )
                                }
                                style={{
                                  backgroundImage: `url(/filters/${filter}.png)`,
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover"
                                }}
                              ></div>
                              <div className="text-xs font-Rubik font-medium text-purple2B3377">
                                {filter}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* {settingsFunctionality === "textEffects" && (
                      <div>
                        <div className="mx-3 mb-3  font-Rubik font-medium text-purple2B3377 text-2xl">
                          Effects
                        </div>
                        <div>
                          {effects.map((effect) => (
                            <div className="m-3 ">
                              <div className="text-base font-medium text-purple2B3377 font-Rubik">
                                {effect}
                              </div>
                              <div className="text-base font-medium text-purple2B3377 font-Rubik">
                                <Slider
                                  value={0}
                                  onChange={(e) => console.log(e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}
                    {settingsFunctionality === "effects" && (
                      <div>
                        <div className="mx-3 mt-6 mb-5 font-Rubik font-medium text-purple2B3377 text-2xl">
                          Effects
                        </div>
                        <div>
                          <div className="m-3">
                            <EffectsComponents
                              canvas={canvas}
                              drawRef={drawRef.current}
                              effects={effects}
                              setEffects={setEffects}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {settingsFunctionality === "choseColor" && (
                      <div>
                        <div className=" mx-3  pt-5 text-base font-Rubik text-purple2B3377 font-medium">
                          Design Colors
                        </div>
                        <div>
                          <SettingsColor
                            allColors={allColors}
                            elementSelectedColor={elementSelectedColor}
                            handleChangeElementColor={(index, color) => {
                              handleChangeElementColor(index, color)
                            }}
                          />
                        </div>

                        <div className=" m-3 text-base font-Rubik text-purple2B3377 font-medium">
                          Custom Colors
                        </div>
                        <div className="flex flex-wrap mx-3">
                          <ColorPickerButton
                            className="cursor-pointer mx-1 my-1 "
                            color={allColors[elementSelectedColor]}
                            handleColorChange={handleChangeSvgColors}
                            handleOpenColorPicker={handleOpenColorPicker}
                            openColorPicker={openColorPicker}
                            type="secondary"
                          />
                          {Background.defaultColors.map((color, index) =>
                            index !== 0 ? (
                              <div
                                className="mx-2 my-1 cursor-pointer"
                                key={index}
                                onClick={() => handleChangeSvgColors(color)}
                              >
                                <div
                                  className="rounded-full h-8 w-8 border border-grayC4C4C4 "
                                  style={{ backgroundColor: color }}
                                ></div>
                              </div>
                            ) : (
                              ""
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {seeAllCategory.visible && (
                  <div>
                    <CategorySeeAll
                      canvas={canvas}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                      data={formatterCategory()}
                      handleBackground={(path, action) => {
                        handleBackground(
                          canvas,
                          path,
                          action,
                          setLastBackgroundImage,
                          canvasWidth,
                          canvasHeight
                        )
                        canvas._historySaveAction()
                        setLastBackgroundImage(path)
                      }}
                      handleSeeAllClick={handleSeeAllClick}
                      handleShapeChosen={(elementData, data) =>
                        handleLoadElement(
                          canvas,
                          elementData,
                          data,
                          setAllColors,
                          canvasWidth
                        )
                      }
                      resetSeeAllCategoryFlag={resetSeeAllCategoryFlag}
                      searchView={false}
                    />
                  </div>
                )}
                {seeAll.visible && (
                  <div>
                    <SeeAll
                      canvas={canvas}
                      canvasHeight={canvasHeight}
                      canvasWidth={canvasWidth}
                      data={formatter()}
                      handleBackground={(path, action) => {
                        handleBackground(
                          canvas,
                          path,
                          action,
                          setLastBackgroundImage,
                          canvasWidth,
                          canvasHeight
                        )
                        canvas._historySaveAction()
                        setLastBackgroundImage(path)
                      }}
                      handleShapeChosen={(elementData, data) =>
                        handleLoadElement(
                          canvas,
                          elementData,
                          data,
                          setAllColors,
                          canvasWidth
                        )
                      }
                      resetSeeAllFlag={resetSeeAllFlag}
                      searchTerm={searchTerm}
                      seeAll={seeAll}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar
