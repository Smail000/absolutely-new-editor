import React from "react";
import styles from "./InvisibleButtonWithIcon.module.css"
import Icon from "../Icon/Icon";
export default function InvisibleButtonWithIcon ({
    src="",
    alt="no text",
    size=20,
    style={},
    ...props
}) {
    return (
        <div 
            className={styles.wrapper}
            style={{width: size, height: size, ...style}}
        >
            <Icon src={src} alt={alt}/>
        </div>
    )
}