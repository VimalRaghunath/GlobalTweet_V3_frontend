import React from 'react'
import "./SidebarOption.css"

const SidebarOption =(props) => {
    const {text,Icon,active} = props;
  return (
    <div className={`Sidebar-Option ${active && "Sidebar-Option__active" }`} >
     <Icon className="SidebarOptionicon"/>
     <h2 className='SidebarOption__label'>{text}</h2>
    </div>
  )
}

export default SidebarOption
