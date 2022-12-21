import React from "react";
import styles from "./Icon.module.css"
export default function Icon({
    src="",
    alt="no text",
    ...props
}) {
    return (
        <img 
            src={src} 
            alt={alt}
            className={styles.img}
            {...props}
        />
    )
}