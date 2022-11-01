//Packages
import React from "react"

function Notification(props) {
  const { text, isOpen } = props
  return (
    <div>
      {isOpen && (
        <div className="absolute text-purple2B3377 bg-white  py-0.5 px-4 rounded-sm z-50  top-4 right-1/2 transform translate-x-1/2 font-Rubik font-medium">
          {text}
        </div>
      )}
    </div>
  )
}

export default Notification
