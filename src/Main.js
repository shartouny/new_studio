import React, { useRef, useState, useEffect } from "react"

// Packages
import { fabric } from "fabric"
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { useHotkeys } from "react-hotkeys-hook"

//Files components
import Fabric from "@Components/canvas/Fabric"
import TopBar from "@Components/navigation/TopBar"
import SideBar from "@Components/navigation/SideBar"
import BottomBar from "@Components/navigation/BottomBar"
import ToolBar from "@Components/navigation/Toolbar"
import Help from "@Components/popUp/Help"
import Notification from "@Components/popUp/Notification"

//Utils
import { zoom } from "@Utils/footer/ZoomInOut"
import { handleChangeColor } from "@Utils/topBarTools/changeColor/ChangeColor"
import { GetSelectedObjects } from "@Utils/elements/shapes/GetSelectedObjects"
import { GetShapeColor } from "@Utils/elements/shapes/GetShapeColor"
import { handlePaste } from "@Utils/shortcutsKeys/ShortcutKeys"
import {
  handleSelectAll,
  handleArrowMovment
} from "@Utils/shortcutsKeys/ShortcutKeys"
import { handleDelete } from "@Utils/topBarTools/commonComponents/CommonComponent"
import { handleTextFormate } from "@Utils/topBarTools/textToolBar/TextToolBar"
import { handleAddTemplateFromUrl } from "@Utils/templates/Tamplate"

//Helpers
import { getActiveText } from "@Helpers/GetActiveText"
import { getActiveGroup } from "@Helpers/GetActiveGroup"
import { getActiveImage } from "@Helpers/GetActiveImage"
import { getLayers } from "@Helpers/GetLayers"
import "@Helpers/FabricHistory"

function Main(props) {
  const {
    canvasWidth,
    setCanvasWidth,
    canvasHeight,
    setCanvasHeight,
    canvasType,
    setCanvasType,
    base64Tamplate,
    printBleedImg
  } = props

  const handleFullscreen = useFullScreenHandle()
  const [swiper, setSwiper] = useState({})
  const drawRef = useRef({})
  const widthRef = useRef(null)
  const [canvas, setCanvas] = useState("")
  const [canvasColor, setCanvasColor] = useState("#fff")
  const [isOpenNavigation, setIsOpenNavigation] = useState(true)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [zoomValue, setZoomValue] = useState(() => {
    return 0 //canvasWidth > 1000 ? 800 / canvasWidth : 1000 / canvasWidth
  })
  const [zoomValueBeforeFullscreen, setZoomValueBeforeFullscreen] = useState(0)
  const [allColors, setAllColors] = useState()
  const [openColorPicker, setOpenColorPicker] = useState(false)
  const [openBackgroundColorPicker, setOpenBackgroundColorPicker] =
    useState(false)
  const [lastBackgroundImage, setLastBackgroundImage] = useState("")

  const [textStyle, setTextStyle] = useState({})
  const [sharedStyling, setSharedStyling] = useState({})
  //bottom Navigation Bar states
  const [ruler, setRuler] = useState(false)
  const [printBleed, setPrintBleed] = useState(false)
  const [guides, setGuides] = useState(false)

  const [isOpenSettings, setIsOpenSettings] = useState(false)
  const [settingsFunctionality, setSettingsFunctionality] = useState("")
  const [fontFamily, setFontFamily] = useState("Times New Roman")
  const [seeAll, setSeeAll] = useState({
    visible: false,
    name: "",
    id: 0
  })
  const [seeAllCategory, setSeeAllCategory] = useState({
    visible: false,
    id: 0
  })

  const [elementSelectedColor, setelementSelectedColor] = useState(-1)

  const [viewElementsBar, setViewElementsBar] = useState(false)
  const [viewTextBar, setViewTextBar] = useState(false)
  const [viewDefaultbar, setViewDefaultbar] = useState(false)
  const [savedTamplate, setSavedTamplate] = useState()
  const [layerList, setLayerList] = useState([])
  const [personalizerLayerList, setPersonalizerLayerList] = useState([])

  const [effects, setEffects] = useState({
    vibrance: "0",
    contrast: "0",
    saturation: "0",
    tint: "0",
    highlights: "0",
    multiply: "0"
  })

  const [isFilterSelected, setIsFilterSelected] = useState({
    Grayscale: true,
    Sepia: true,
    Kodachrome: true,
    Technicolor: true,
    Polaroid: true
  })

  const [templateState, setTemplateState] = useState([])
  const [selectedObjects, setSelectedObjects] = useState([])
  const [notification, setNotification] = useState({
    text: "",
    isOpen: false
  })

  const [historyClick, setHistoryClick] = useState(0)
  const [historyCount, setHistoryCount] = useState(0)

  const [textFormate, setTextFormate] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isCapitalize: false
  })

  const [helperStep, setHelperStep] = useState(-1)

  var fabricAlias = null
  var isUndo = false
  var varCount = 0
  var varClick = 0
  var selectedObjs = []

  const initCanvas = () => {
    var newFabric = new fabric.Canvas("canvas-main", {
      height: canvasHeight * zoomValue,
      width: canvasWidth * zoomValue,
      backgroundColor: canvasColor,
      // centeredScaling: true,
      preserveObjectStacking: true
    })
    fabricAlias = newFabric
    newFabric.on("object:modified", function () {
      setSavedTamplate(
        newFabric.toJSON([
          "name",
          "id",
          "category",
          "parentCategory",
          "data",
          "data.data.text",
          "data.data.placeholder",
          "hasBorders",
          "borderColor",
          "cornerColor",
          "cornerSize",
          "transparentCorners",
          "cornerStyle",
          "lock",
          "lockMovementX",
          "lockMovementY",
          "selectable",
          "evented",
          "referenceColorIndex",
          "referenceColor"
        ])
      )

      setLayerList(
        getLayers(newFabric).filter(
          (layer) =>
            !layer.name?.startsWith("Guidelines") &&
            !layer.name?.startsWith("PrintBleed")
        )
      )
      // PERSONALIZER
      // setPersonalizerLayerList(
      //   getLayers(newFabric).filter(
      //     (layer) =>
      //       layer.name?.startsWith("Text Personalization Layer") ||
      //       layer.name?.startsWith("Image Personalization Layer")
      //   )
      // )
    })
    newFabric.on("object:added", function () {
      setSavedTamplate(
        newFabric.toJSON([
          "name",
          "id",
          "category",
          "parentCategory",
          "data",
          "data.data.text",
          "data.data.placeholder",
          "hasBorders",
          "borderColor",
          "cornerColor",
          "cornerSize",
          "transparentCorners",
          "cornerStyle",
          "lock",
          "lockMovementX",
          "lockMovementY",
          "selectable",
          "evented",
          "referenceColorIndex",
          "referenceColor"
        ])
      )

      setLayerList(
        getLayers(newFabric).filter(
          (layer) =>
            !layer.name?.startsWith("Guidelines") &&
            !layer.name?.startsWith("PrintBleed")
        )
      )
      // PERSONALIZER
      // setPersonalizerLayerList(
      //   getLayers(newFabric).filter(
      //     (layer) =>
      //       layer.name?.startsWith("Text Personalization Layer") ||
      //       layer.name?.startsWith("Image Personalization Layer")
      //   )
      // )
    })

    newFabric.on("object:removed", function () {
      setSavedTamplate(
        newFabric.toJSON([
          "name",
          "id",
          "category",
          "parentCategory",
          "data",
          "data.data.text",
          "data.data.placeholder",
          "hasBorders",
          "borderColor",
          "cornerColor",
          "cornerSize",
          "transparentCorners",
          "cornerStyle",
          "lock",
          "lockMovementX",
          "lockMovementY",
          "selectable",
          "evented",
          "referenceColorIndex",
          "referenceColor"
        ])
      )

      setLayerList(
        getLayers(newFabric).filter(
          (layer) =>
            !layer.name?.startsWith("Guidelines") &&
            !layer.name?.startsWith("PrintBleed")
        )
      )
      // PERSONALIZER
      // setPersonalizerLayerList(
      //   getLayers(newFabric).filter(
      //     (layer) =>
      //       layer.name?.startsWith("Text Personalization Layer") ||
      //       layer.name?.startsWith("Image Personalization Layer")
      //   )
      // )
    })

    newFabric.on("history:append", function () {
      if (isUndo) {
        isUndo = false
        setHistoryClick(varCount)
      } else {
        varCount++
        varClick++
        setHistoryCount((hist) => (hist = hist + 1))
        setHistoryClick((prev) => (prev = prev + 1))
      }
    })

    newFabric.on("history:redo", function () {
      isUndo = false
      varClick++
      setHistoryClick((prev) => (prev = prev + 1))
    })

    newFabric.on("history:undo", function () {
      isUndo = true
      varClick--
      setHistoryClick((prev) => (prev = prev - 1))
    })

    newFabric.on("after:render", function () {
      setSavedTamplate(
        newFabric.toJSON([
          "name",
          "id",
          "category",
          "parentCategory",
          "data",
          "data.data.text",
          "data.data.placeholder",
          "hasBorders",
          "borderColor",
          "cornerColor",
          "cornerSize",
          "transparentCorners",
          "cornerStyle",
          "lock",
          "lockMovementX",
          "lockMovementY",
          "selectable",
          "evented",
          "referenceColorIndex",
          "referenceColor"
        ])
      )
      setLayerList(
        getLayers(newFabric).filter(
          (layer) =>
            !layer.name?.startsWith("Guidelines") &&
            !layer.name?.startsWith("PrintBleed")
        )
      )
      // PERSONALIZER
      // setPersonalizerLayerList(
      //   getLayers(newFabric).filter(
      //     (layer) =>
      //       layer.name?.startsWith("Text Personalization Layer") ||
      //       layer.name?.startsWith("Image Personalization Layer")
      //   )
      // )
    })

    newFabric.on("selection:updated", function (e) {
      eventColorChanger(e, newFabric)
    })

    newFabric.on("selection:created", function (value) {
      eventColorChanger(value, newFabric)
      setSavedTamplate(
        newFabric.toJSON([
          "name",
          "id",
          "category",
          "parentCategory",
          "data",
          "data.data.text",
          "data.data.placeholder",
          "hasBorders",
          "borderColor",
          "cornerColor",
          "cornerSize",
          "transparentCorners",
          "cornerStyle",
          "lock",
          "lockMovementX",
          "lockMovementY",
          "selectable",
          "evented",
          "referenceColorIndex",
          "referenceColor"
        ])
      )
    })
    newFabric.on("selection:cleared", function () {
      setViewElementsBar(false)
      setViewTextBar(false)
      setIsOpenSettings(false)
      setOpenColorPicker(false)
      setViewDefaultbar(false)
      setSelectedObjects([])
    })

    newFabric.on("mouse:down:before", function (e) {
      if (
        (e.target?.lock === true && e.target?.name === "GuidelinesX") ||
        e.target?.name === "GuidelinesY"
      ) {
        fabricAlias.setActiveObject(e.target)
      }
    })

    newFabric.on("mouse:down", function (e) {
      if (e.target?.lock === true && e.target.name !== "PrintBleed") {
        fabricAlias.setActiveObject(e.target)
      }
    })

    newFabric.on("object:moving", function (e) {
      let activeObjects = newFabric.getActiveObjects()
      if (e.target?._objects) {
        if (!e.target.isOnScreen()) {
          return newFabric.on("mouse:up", function () {
            if (!e.target.isOnScreen()) {
              activeObjects.map((value) => newFabric.remove(value))
              newFabric.off("mouse:move", function () {
                newFabric.discardActiveObject()
              })
            }
          })
        }
      } else {
        if (!e.target.isOnScreen()) {
          newFabric.on("mouse:up", function () {
            if (!e.target.isOnScreen()) {
              newFabric.remove(e.target)
            }
          })
        }
      }
    })
    return newFabric
  }

  var copiedObjects = null
  //Shortcuts
  useHotkeys("Delete", () => fabricAlias && handleDelete(fabricAlias))

  useHotkeys("ctrl+c", () => (copiedObjects = fabricAlias.getActiveObjects()))

  useHotkeys("ctrl+v", () => handlePaste(fabricAlias, copiedObjects))

  useHotkeys("ctrl+a", () => handleSelectAll(fabricAlias))

  useHotkeys("ctrl+z", () => fabricAlias.undo())

  useHotkeys("ctrl+y", () => fabricAlias.redo())

  useHotkeys("*", (e) => handleArrowMovment(fabricAlias, e.code))

  useHotkeys("ctrl+b", () => {
    setTextStyle((prev) => {
      return {
        ...prev,
        fontWeight: !prev.fontWeight
      }
    })
    handleTextFormate(fabricAlias, "bold", "bold", setTextFormate)
  })

  useHotkeys("ctrl+i", () => {
    setTextStyle((prev) => {
      return {
        ...prev,
        fontStyle: !prev.fontStyle
      }
    })
    handleTextFormate(fabricAlias, "italic", "italic", setTextFormate)
  })

  useHotkeys("ctrl+u", (e) => {
    setTextStyle((prev) => {
      return {
        ...prev,
        underline: !prev.underline
      }
    })

    handleTextFormate(fabricAlias, "underline", "underline", setTextFormate)
    e.preventDefault()
  })
  ///////////////////////////mac hot keys////////////////////////
  useHotkeys("backspace", () => fabricAlias && handleDelete(fabricAlias))

  useHotkeys(
    "Command+c",
    () => (copiedObjects = fabricAlias.getActiveObjects())
  )

  useHotkeys("Command+v", () => handlePaste(fabricAlias, copiedObjects))

  useHotkeys("Command+a", () => handleSelectAll(fabricAlias))

  useHotkeys("Command+z", () => fabricAlias.undo())

  useHotkeys("Command+y", () => fabricAlias.redo())

  useHotkeys("*", (e) => handleArrowMovment(fabricAlias, e.code))

  useHotkeys("Command+b", () => {
    setTextStyle((prev) => {
      return {
        ...prev,
        fontWeight: !prev.fontWeight
      }
    })
    handleTextFormate(fabricAlias, "bold", "bold", setTextFormate)
  })

  useHotkeys("Command+i", () => {
    setTextStyle((prev) => {
      return {
        ...prev,
        fontStyle: !prev.fontStyle
      }
    })
    handleTextFormate(fabricAlias, "italic", "italic", setTextFormate)
  })

  useHotkeys("Command+u", (e) => {
    setTextStyle((prev) => {
      return {
        ...prev,
        underline: !prev.underline
      }
    })

    handleTextFormate(fabricAlias, "underline", "underline", setTextFormate)
    e.preventDefault()
  })

  const viewSettings = (functionality) => {
    if (seeAllCategory.visible) {
      setSeeAllCategory({
        visible: false,
        id: 0
      })
      setSeeAll({
        visible: false,
        name: "",
        id: 0
      })
    }
    if (seeAll.visible) {
      setSeeAll({
        visible: false,
        name: "",
        id: 0
      })
    }

    if (settingsFunctionality === functionality) {
      setIsOpenSettings((prev) => !prev)
    } else {
      setIsOpenSettings(true)
      setSettingsFunctionality(functionality)
    }
  }

  const handleChangeFullscreen = (boolean) => {
    if (!boolean) {
      if (canvas) {
        setZoomValue(zoomValueBeforeFullscreen)
        zoom(
          canvas,
          zoomValueBeforeFullscreen,
          "",
          canvasWidth,
          canvasHeight,
          "",
          lastBackgroundImage,
          setLastBackgroundImage
        )
        canvas.forEachObject((object) => {
          object.selectable = true
          object.evented = true
        })
      }
    }
  }
  const eventColorChanger = (e, canvas) => {
    //group selection-> it will return activeSelection
    //svg selection-> group
    //image selection -> image
    const type = e.target.get("type")
    setViewDefaultbar(true)

    if (selectedObjs.category === "Text" && type !== "textbox")
      setIsOpenSettings(false)

    if (
      (selectedObjs.category === "Graphics" ||
        selectedObjs.category === "Photos" ||
        selectedObjs.category === "Line & Shapes") &&
      type === "textbox"
    )
      setIsOpenSettings(false)

    if (
      (selectedObjs.category === "Graphics" ||
        selectedObjs.category === "Line & Shapes") &&
      type === "image"
    )
      setIsOpenSettings(false)

    const selectedObjects = GetSelectedObjects(canvas)

    setSelectedObjects(selectedObjects)
    selectedObjs = selectedObjects
    if (
      type === "group" ||
      type === "circle" ||
      type === "rect" ||
      type === "path"
    ) {
      const shapeColors = GetShapeColor(selectedObjects)

      setSharedStyling({
        opacity: shapeColors.opacity,
        lock: shapeColors.lock
      })

      setViewElementsBar(true)
      setViewTextBar(false)
      setAllColors(shapeColors.filteredColor)
    } else if (type === "image") {
      setAllColors([])
      setViewElementsBar(true)
      setViewTextBar(false)
      const activeImage = getActiveImage(selectedObjects)
      setSharedStyling({
        opacity: activeImage.opacity,
        lock: activeImage.lock
      })
    } else if (type === "textbox") {
      setViewTextBar(true)
      setViewElementsBar(false)
      const activeTextStyle = getActiveText(canvas)
      setFontFamily(activeTextStyle.fontFamily)
      setTextStyle(activeTextStyle)
      setSharedStyling({
        opacity: activeTextStyle.opacity,
        lock: activeTextStyle.lock
      })
    } else if (type === "activeSelection") {
      const selectionGroupType = getActiveGroup(canvas)
      if (selectionGroupType.shape || selectionGroupType.image) {
        setViewElementsBar(true)
        setViewTextBar(false)
        setAllColors([])
      } else if (selectionGroupType.textBox) {
        setViewElementsBar(false)
        setViewTextBar(true)
        setAllColors([])
      } else {
        setViewElementsBar(true)
        setViewTextBar(false)
        setAllColors([])
      }
    }
    if (e.target?.name === "GuidelinesX" || e.target?.name === "GuidelinesY") {
      setViewElementsBar(false)
      setViewTextBar(false)
      setIsOpenSettings(false)
      setOpenColorPicker(false)
      setViewDefaultbar(false)
    }
  }

  const resetSeeAllFlag = (hasSubCategory) => {
    if (hasSubCategory) {
      // setOpenColorPicker(false)
      setSeeAll({
        visible: false,
        name: "",
        id: 0
      })
      setSeeAllCategory((prev) => {
        return {
          visible: true,
          id: prev.id
        }
      })
    } else {
      setIsOpenSettings(false)
      setOpenColorPicker(false)
      setSeeAll({
        visible: false,
        name: "",
        id: 0
      })
    }
    // setIsOpenSettings(false)
    // setOpenColorPicker(false)
    // setSeeAll({
    //   visible: false,
    //   id: 0
    // })
    // setSeeAllCategory((prev) => {
    //   return {
    //     visible: true,
    //     id: prev.id
    //   }
    // })
  }
  const resetSeeAllCategoryFlag = () => {
    setIsOpenSettings(false)
    setOpenColorPicker(false)
    setSeeAllCategory({
      visible: false,
      id: 0
    })
  }
  const handleTabChosen = (tabIndex) => {
    //closing settings
    setIsOpenSettings(false)
    //resetting seeAll flag
    setSeeAll({
      visible: false,
      name: "",
      id: 0
    })
    setSeeAllCategory({
      visible: false,
      id: 0
    })

    //resetting colorpicker flag
    setOpenColorPicker(false)

    if (tabIndex === selectedTabIndex) {
      // setIsOpenNavigation((prev) => !prev)
      setIsOpenNavigation(true)
    } else {
      setSelectedTabIndex(tabIndex)
      setIsOpenNavigation(true)
    }
  }
  const openSettings = () => {
    setIsOpenSettings((prev) => !prev)
  }

  const changeFont = (font) => {
    setFontFamily(font)
  }

  const hanldeChangeSeeAll = (id, categoryName) => {
    setSeeAll({
      visible: true,
      name: categoryName,
      id: id
    })
    setSeeAllCategory((prev) => {
      return {
        visible: false,
        id: prev.id
      }
    })
  }
  const hanldeChangeSeeAllCategory = (id) => {
    setSeeAllCategory({
      visible: true,
      id: id
    })
  }

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  const handleOpenColorPicker = () => {
    setOpenColorPicker((prev) => !prev)
  }
  const handleOpenBackgroundColorPicker = () => {
    setOpenBackgroundColorPicker((prev) => !prev)
  }

  const handleChangeElementColor = (index) => {
    setSeeAll({ visible: false, id: 0, name: "" })
    setSeeAllCategory({ visible: false, id: 0 })

    setSettingsFunctionality("choseColor")
    if (index === elementSelectedColor) {
      setIsOpenSettings((prev) => !prev)
    } else {
      setIsOpenSettings(true)
    }
    setelementSelectedColor(index)
  }

  const handleChangeSvgColors = (color) => {
    let colorsArray = [...allColors]
    if (color?.rgb) {
      colorsArray[elementSelectedColor] = color.rgb
      handleChangeColor(
        canvas,
        elementSelectedColor,
        color.rgb,
        "custome color"
      )
    } else {
      colorsArray[elementSelectedColor] = color
      handleChangeColor(
        canvas,
        elementSelectedColor,
        color,
        "default color",
        allColors
      )
    }
    setAllColors(colorsArray)
  }

  const viewGuidelines = (boolean) => {
    const objects = getLayers(canvas).filter(
      (layer) => layer.name === "GuidelinesX" || layer.name === "GuidelinesY"
    )
    objects.map((obj) => obj.set({ visible: boolean }))
    canvas.renderAll()
  }
  const handleChangeRulerClicked = () => {
    if (!ruler) {
      setRuler(true)
    } else {
      setGuides(false)
      setRuler(false)
      viewGuidelines(false)
    }
  }

  const handleChangeGuidesClicked = () => {
    if (guides) {
      viewGuidelines(false)
    } else {
      viewGuidelines(true)
    }
    setGuides((prev) => !prev)
  }

  const createVerticalLine = (e) => {
    const offset = document.getElementById("scrolldiv").scrollTop

    var canvasspace = document
      .getElementById("canvas-main")
      .getBoundingClientRect()

    var dimension = 0
    if (canvasspace.top < 0) dimension = 162
    else dimension = canvasspace.top

    canvas.add(
      new fabric.Line(
        [
          0,
          (e.pageY + offset - dimension) / zoomValue,
          canvasWidth,
          (e.pageY + offset - dimension) / zoomValue
        ],
        {
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          lockMovementX: true,
          lockRotation: true,
          excludeFromExport: "true",
          name: "GuidelinesY",
          hasControls: false,
          evented: true,
          lock: true
        }
      )
    )
    setGuides(true)
    viewGuidelines(true)
  }

  const createHorizontalLine = (e) => {
    const offset = document.getElementById("scrolldiv").scrollLeft

    var canvasspace = document
      .getElementById("canvas-main")
      .getBoundingClientRect()

    var dimension = 0
    var pointDistance = 0
    if (canvasspace.left < 0) {
      dimension = 556
      pointDistance = e.pageX + offset - dimension
    } else if (canvasspace.left < e.pageX && offset != 0) {
      pointDistance = e.pageX - canvasspace.left
    } else {
      dimension = canvasspace.left
      pointDistance = e.pageX + offset - dimension
    }
    canvas.add(
      new fabric.Line(
        [pointDistance / zoomValue, 0, pointDistance / zoomValue, canvasHeight],
        {
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          lockMovementY: true,
          lockRotation: true,
          excludeFromExport: "true",
          name: "GuidelinesX",
          hasControls: false,
          evented: true,
          lock: true
        }
      )
    )
    setGuides(true)
    viewGuidelines(true)
  }

  useEffect(() => {
    //reset of effect on img change
    setEffects({
      vibrance: "0",
      contrast: "0",
      saturation: "0",
      tint: "0",
      highlights: "0",
      multiply: "0"
    })
    setIsFilterSelected({
      Grayscale: true,
      Sepia: true,
      Kodachrome: true,
      Technicolor: true,
      Polaroid: true
    })
  }, [lastBackgroundImage])

  useEffect(() => {
    let cashedTemplate = localStorage?.getItem("test")
    base64Tamplate &&
      handleAddTemplateFromUrl(fabricAlias, base64Tamplate, cashedTemplate)
  }, [templateState])

  useEffect(() => {
    let divWidth = widthRef.current.clientWidth
    if (canvas) {
      if (canvasWidth > divWidth - 100) {
        setZoomValue(800 / canvasWidth)
        setZoomValueBeforeFullscreen(800 / canvasWidth)
        zoom(
          canvas,
          800 / canvasWidth,
          "",
          canvasWidth,
          canvasHeight,
          "",
          "",
          ""
        )
      } else {
        setZoomValue(1)
        setZoomValueBeforeFullscreen(1)
        zoom(canvas, 1, "", canvasWidth, canvasHeight, "", "", "")
      }
    }
  }, [widthRef.current])

  return (
    <div className="h-full w-full">
      <Help
        helperStep={helperStep}
        setHelperStep={setHelperStep}
        setSwiper={setSwiper}
        swiper={swiper}
      />

      <div className="flex w-full h-full flex-col">
        <Notification isOpen={notification.isOpen} text={notification.text} />
        <TopBar
          canvas={canvas}
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          savedTamplate={savedTamplate}
          setNotification={setNotification}
          setTemplateState={setTemplateState}
          templateState={templateState}
        />

        <div className="flex h-full">
          <SideBar
            allColors={allColors}
            canvas={canvas}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            changeFont={changeFont}
            drawRef={drawRef}
            effects={effects}
            elementSelectedColor={elementSelectedColor}
            fontFamily={fontFamily}
            handleChangeElementColor={setelementSelectedColor}
            handleChangeSvgColors={handleChangeSvgColors}
            handleOpenBackgroundColorPicker={handleOpenBackgroundColorPicker}
            handleOpenColorPicker={handleOpenColorPicker}
            handleTabChosen={handleTabChosen}
            hanldeChangeSeeAll={hanldeChangeSeeAll}
            hanldeChangeSeeAllCategory={hanldeChangeSeeAllCategory}
            isFilterSelected={isFilterSelected}
            isOpenNavigation={isOpenNavigation}
            isOpenSettings={isOpenSettings}
            lastBackgroundImage={lastBackgroundImage}
            openBackgroundColorPicker={openBackgroundColorPicker}
            openColorPicker={openColorPicker}
            openSettings={openSettings}
            personalizerLayerList={personalizerLayerList}
            resetSeeAllCategoryFlag={resetSeeAllCategoryFlag}
            resetSeeAllFlag={resetSeeAllFlag}
            seeAll={seeAll}
            seeAllCategory={seeAllCategory}
            selectedObjects={selectedObjects}
            selectedTabIndex={selectedTabIndex}
            setAllColors={setAllColors}
            setEffects={setEffects}
            setIsFilterSelected={setIsFilterSelected}
            setLastBackgroundImage={setLastBackgroundImage}
            setNotification={setNotification}
            setPersonalizerLayerList={setPersonalizerLayerList}
            setSelectedObjects={setSelectedObjects}
            setelementSelectedColor={setelementSelectedColor}
            settingsFunctionality={settingsFunctionality}
            templateState={templateState}
          />
          <div className="w-full h-full justify-between flex   flex-col">
            <ToolBar
              allColors={allColors}
              canvas={canvas}
              elementSelectedColor={elementSelectedColor}
              fontFamily={fontFamily}
              handleChangeElementColor={handleChangeElementColor}
              historyClick={historyClick}
              historyCount={historyCount}
              lastBackgroundImage={lastBackgroundImage}
              selectedTabIndex={selectedTabIndex}
              setSharedStyling={setSharedStyling}
              setTextFormate={setTextFormate}
              setTextStyle={setTextStyle}
              settingsFunctionality={settingsFunctionality}
              sharedStyling={sharedStyling}
              textFormate={textFormate}
              textStyle={textStyle}
              viewDefaultbar={viewDefaultbar}
              viewElementsBar={viewElementsBar}
              viewSettings={viewSettings}
              viewTextBar={viewTextBar}
            />
            <main className="relative h-full w-full bg-grayF0F0F0 ">
              <FullScreen
                handle={handleFullscreen}
                onChange={handleChangeFullscreen}
              >
                <Fabric
                  canvasHeight={canvasHeight}
                  canvasWidth={canvasWidth}
                  createHorizontalLine={createHorizontalLine}
                  createVerticalLine={createVerticalLine}
                  fullscreenFlag={handleFullscreen.active}
                  isOpenNavigation={isOpenNavigation}
                  printBleed={printBleed}
                  ruler={ruler}
                  triggerClick={() => canvas.discardActiveObject().renderAll()}
                  widthRef={widthRef}
                  zoomValue={zoomValue}
                />
              </FullScreen>
            </main>
            <BottomBar
              borderAction={() => {
                printBleed ? setPrintBleed(false) : setPrintBleed(true)
              }}
              canvas={canvas}
              canvasHeight={canvasHeight}
              canvasType={canvasType}
              canvasWidth={canvasWidth}
              drawRef={drawRef}
              guides={guides}
              handleChangeGuidesClicked={handleChangeGuidesClicked}
              handleChangeRulerClicked={handleChangeRulerClicked}
              handleFullscreen={handleFullscreen.enter}
              lastBackgroundImage={lastBackgroundImage}
              layerList={layerList}
              printBleed={printBleed}
              printBleedImg={printBleedImg}
              ruler={ruler}
              selectedObjects={selectedObjects}
              setCanvasHeight={setCanvasHeight}
              setCanvasType={setCanvasType}
              setCanvasWidth={setCanvasWidth}
              setLastBackgroundImage={setLastBackgroundImage}
              setLayerList={setLayerList}
              setRuler={setRuler}
              setSharedStyling={setSharedStyling}
              setZoomValue={(e) => {
                setZoomValue(e)
              }}
              setZoomValueBeforeFullscreen={setZoomValueBeforeFullscreen}
              sharedStyling={sharedStyling}
              zoomIn={zoom}
              zoomValue={zoomValue}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
