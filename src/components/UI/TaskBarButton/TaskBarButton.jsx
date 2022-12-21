import React from "react";
import styles from "./TaskBarButton.module.css"

import Icon from "../Icon/Icon";

export default function TaskBarButton ({
    arrayOfIcons=[],
    size="20px",
    style={},
    src="none",

    side="none",
    id=0,
    isActive=false,
    onClick=()=>{},
    ...props
}) {
    return (
        <div 
            className={[styles.taskbarbutton, isActive ? styles.active : ""].join(" ").trim()}
            style={{
                width: size, 
                height: size,
                ...style
            }}
            onClick={()=>{onClick(id, side)}}
            {...props}
        >
            <Icon src={src === "none" ? arrayOfIcons[id] : src}/>
        </div>
    )
}