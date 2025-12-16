import React from 'react'

const Button = ({onclick, classes, content}) => {
  return (
    <button onClick={onclick} className={` rounded-sm text-center bg-p3 font-medium cursor-pointer hover:bg-p1 hover:text-black hover:border-p2 border-2 border-p3 text-p1  ${classes}`}>
        {content}
    </button>
  )
}

export default Button