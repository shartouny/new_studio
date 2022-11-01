//Packages
import React from "react"

const Button = (props) => {
  const { id, className, icon, label, onClick } = props

  return (
    <>
      <button className={`${className}`} id={id} onClick={onClick}>
        {icon && (
          <div className="p-1">
            <img alt="icon" src={icon} />
          </div>
        )}
        {label && <div className="p-1">{label}</div>}
      </button>
    </>
  )
}

export default Button
