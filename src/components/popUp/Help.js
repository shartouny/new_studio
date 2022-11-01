//Packages
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"
import "./../../style/swiper.css"

// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination } from "swiper"

//Components
import Button from "@Components/inputs/Button"

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination])

function Help(props) {
  const { helperStep, setHelperStep, swiper, setSwiper } = props
  return (
    <div>
      <div
        className="h-10 w-10 bg-purple2B3377 absolute  flex items-center justify-center cursor-pointer  rounded-l-md right-0 top-1/2"
        onClick={() => setHelperStep(0)}
        style={{ zIndex: "999" }}
      >
        <img alt="help" className="m-auto" src="/help/help.svg" />
      </div>
      {helperStep !== -1 && (
        <div
          className="absolute h-full w-full"
          style={{
            zIndex: "1000",
            background: "rgba(140, 147, 171, 0.5)"
          }}
        >
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="sm:w-3/4 2xl:w-2/5 right-1.5  relative top-8">
              <img
                align="right"
                alt="close"
                className="cursor-pointer"
                onClick={() => setHelperStep(-1)}
                src="/help/close.svg"
              />
            </div>
            <div className="sm:w-3/4 2xl:w-2/5  flex flex-col justify-center items-center  rounded-md   bg-white">
              {helperStep !== 7 ? (
                <div className="font-Bison text-3xl text-purple2B3377 my-5  ">
                  INTRODUCING TEELAUNCH STUDIO
                </div>
              ) : (
                <div className="font-Bison text-center text-3xl text-purple2B3377  mt-5 leading-6 h-14">
                  you’re all set!<br></br>time to pump some creative juice!
                </div>
              )}
              <Swiper
                className="w-full"
                direction={"vertical"}
                mousewheel={true}
                onInit={(ev) => {
                  setSwiper(ev)
                }}
                onSlideChange={(e) => setHelperStep(e.activeIndex)}
                pagination={{
                  clickable: true
                }}
                slidesPerView={1}
                spaceBetween={0}
                style={{ height: "28rem" }}
              >
                <SwiperSlide>
                  <div>
                    <img alt={"main-img"} src="/help/main-help.svg" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center">
                    <div className="font-Rubik text-3xl   text-purple2B3377 my-2.5  font-semibold ">
                      Interface functions
                    </div>
                    <div className=" w-full flex   py-16 my-1   ">
                      <div className="grid grid-cols-4 w-full px-10">
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="ruler" src="/help/ruler.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Ruler
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Toggle the measurment grid to create red lines to
                            align objects symetrically
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="guides" src="/help/guides.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Show guides
                            </div>
                          </div>

                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Toggle the alignment red lines on and off
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="bleed" src="/help/bleed.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Document Bleed
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Display the limits of the design area
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="flip" src="/help/flip.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Flip Artboard
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Switch the artboard vertically or horizontally
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="undoredo" src="/help/undoredo.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Undo/Redo
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Remove or repeat single or multiple actions
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="fullscreen" src="/help/fullscreen.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Full Screen
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Toggle maximum size window
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="save" src="/help/save.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Save
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Saves the design to your image library
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="download" src="/help/download.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Download
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Download the design to your device
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center   w-full">
                    <img
                      alt="element"
                      className="pt-2.5"
                      src="/help/element.svg"
                    />
                    <div className="font-Rubik text-2xl text-purple2B3377  mb-5 mt-2.5 font-semibold ">
                      Elements
                    </div>

                    <div className=" w-full  flex  py-5  ">
                      {
                        <div className="grid grid-cols-4 w-full px-10 ">
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="shapes"
                                  className="mx-2"
                                  src="/help/shape.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Shapes
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377">
                                    Add geometric shapes and lines to your
                                    design
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="graphics"
                                  className="mx-2"
                                  src="/help/graphic.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Graphics
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377">
                                    Add geometric shapes and lines to your
                                    design
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="Photos"
                                  className="mx-2"
                                  src="/help/photo.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Photos
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377">
                                    Add geometric shapes and lines to your
                                    design
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center">
                    <div className="font-Rubik text-3xl text-purple2B3377 my-2 font-semibold ">
                      Interface functions
                    </div>
                    <div className=" w-full flex my-2  ">
                      {
                        <div className="grid grid-cols-4 w-full px-10">
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="align" src="/help/align.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Align
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Symetrically place your object on the artboard
                              horizontally or vertically
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="fliph" src="/help/fliph.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Flip Horizontal
                              </div>
                            </div>

                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Mirror your design horizontally
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="flipv" src="/help/flipv.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Flip Vertical
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Mirror your design vertically
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="position" src="/help/position.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Arrange position
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Swap positions between your objects forward or
                              backward{" "}
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="opacity" src="/help/opacity.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Opacity
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Increase or decrease the transparency ratio of
                              your object{" "}
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="duplicate" src="/help/duplicate.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Duplicate
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Create an extra copy of the object
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="lock" src="/help/lock.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Lock
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Secure your object in place{" "}
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="delete" src="/help/delete.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Delete
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Remove your object
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="effect" src="/help/effect.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Effect
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Choose pre-existing image modes for your
                              background{" "}
                            </div>
                          </div>
                          <div className="pb-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                              <img alt="filters" src="/help/filters.svg" />
                              <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                                Filters
                              </div>
                            </div>
                            <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                              Increase or decrease multiple image variations to
                              your background
                            </div>
                          </div>{" "}
                        </div>
                      }
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center">
                    <div className="font-Rubik text-3xl   text-purple2B3377 my-2.5  font-semibold ">
                      Text functions
                    </div>
                    <div className=" w-full flex  py-16 my-1   ">
                      <div className="grid grid-cols-4 w-full px-10">
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="color" src="/help/color.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Font Color
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Change text color
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="bold" src="/help/bold.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Bold Font
                            </div>
                          </div>

                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Increase the text thickness{" "}
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="italic" src="/help/italic.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Italic Font
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Creates an indented text
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="underline" src="/help/underline.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Underline Font
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Adds a stroke under the text
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="capitalize" src="/help/capitalize.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Capital Letters
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Toggle between upper case and lower case letters
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="justify" src="/help/justify.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Justification
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Align text in multiple positions
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img
                              alt="letterSpacing"
                              src="/help/letterSpacing.svg"
                            />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Letter spacing
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Increase or decrease space between letters
                          </div>
                        </div>
                        <div className="pb-4 px-2">
                          <div className="flex flex-col items-center justify-center">
                            <img alt="lineHeight" src="/help/lineHeight.svg" />
                            <div className="text-purple2B3377 font-Rubik font-medium text-base py-2">
                              Line height
                            </div>
                          </div>
                          <div className="text-center font-normal text-purple2B3377 font-Rubik text-xs">
                            Increase or decrease space between sentences.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center   w-full">
                    <img
                      alt="background"
                      className="pt-2.5  "
                      src="/help/background.svg"
                    />
                    <div className="font-Rubik text-2xl text-purple2B3377  mb-5 mt-2.5 font-semibold ">
                      Background
                    </div>

                    <div className=" w-full  flex  py-5  ">
                      {
                        <div className="grid grid-cols-4 w-full px-10 ">
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="colors"
                                  className="mx-2"
                                  src="/help/colors.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Colors
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377 w-64 text-left">
                                    Select or add a solid background color of
                                    your choice
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="patterns"
                                  className="mx-2"
                                  src="/help/patterns.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Patterns
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377 w-64 text-left">
                                    Add a pattern background of your choice
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-4 my-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <img
                                  alt="wallpapers"
                                  className="mx-2"
                                  src="/help/wallpapers.svg"
                                />
                                <div className="mx-2">
                                  <div className="font-Rubik text-purple2B3377 text-left text-sm font-medium">
                                    Wallpapers
                                  </div>
                                  <div className="font-Rubik font-normal text-xs text-purple2B3377 w-64 text-left">
                                    Add an image background to your design
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>{" "}
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center  w-full">
                    <img
                      alt="template"
                      className="pt-2.5"
                      src="/help/template.svg"
                    />
                    <div className="font-Rubik text-2xl text-purple2B3377 mt-2.5 mb-5 font-semibold ">
                      Templates
                    </div>

                    <div className=" w-full  flex my-8 py-0.5">
                      {
                        <div className="grid grid-cols-4 w-full px-10 ">
                          <div className="col-span-4 my-20">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center w-64">
                                <div className="font-Rubik font-normal text-base text-purple2B3377">
                                  Browse custom created layouts with
                                  pre-determined components that you can edit
                                  accordingly
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </SwiperSlide>
                {/*                 
                <SwiperSlide>
                  <div className="flex flex-col justify-center items-center  w-full">
                    <img
                      alt="personalizer"
                      className="pt-2.5"
                      src="/help/personalizer.svg"
                    />
                    <div className="font-Rubik text-2xl text-purple2B3377 mt-2.5 mb-5 font-semibold ">
                      Personalizer
                    </div>

                    <div className=" w-full  flex my-9 py-0.5">
                      {
                        <div className="grid grid-cols-4 w-full px-10 ">
                          <div className="col-span-4 ">
                            <div className="flex  items-center justify-center mb-5">
                              <div className="flex items-center justify-center w-96">
                                <div className="font-Rubik font-normal text-base text-center text-purple2B3377">
                                  This feature allows you to create custom
                                  fields that your customers can edit based on
                                  pre-determined options you determine
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className=" flex items-center justify-center w-96 space-x-4">
                                <div className="flex items-center justify-center flex-col w-44">
                                  <img
                                    alt="textLayer"
                                    src="/help/textLayer.svg"
                                  />
                                  <div className="font-medium font-Rubik my-2  text-purple2B3377 text-xs">
                                    Add Text Layer
                                  </div>
                                  <div className="font-Rubik  text-center text-purple2B3377 font-normal text-xs">
                                    Create a Text box with editable content
                                  </div>
                                </div>
                                <div className="flex items-center justify-center flex-col w-44">
                                  <img
                                    alt="imageLayer"
                                    src="/help/imageLayer.svg"
                                  />
                                  <div className="font-medium font-Rubik  my-2 text-purple2B3377 text-xs">
                                    Add Text Layer
                                  </div>
                                  <div className="font-Rubik text-center  text-purple2B3377 font-normal text-xs">
                                    Create a specific frame that allows the
                                    customer to upload his image
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </SwiperSlide>
               */}
                <SwiperSlide>
                  <img alt={"main-img"} src="/help/finishpic.svg" />
                </SwiperSlide>
              </Swiper>

              <Button
                className={`bg-purple2B3377 rounded-full my-5 py-1 font-Rubik font-medium text-xs text-white ${
                  helperStep === 7 ? " w-32" : " w-28"
                }`}
                icon=""
                label={helperStep === 7 ? "Start Designing" : "Next"}
                onClick={() => {
                  if (helperStep === 7) {
                    setHelperStep(-1)
                  } else {
                    swiper.slideNext()
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Help
