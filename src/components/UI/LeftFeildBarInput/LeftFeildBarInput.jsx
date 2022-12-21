import React from "react";
import styles from "./LeftFeildBarInput.module.css"
export default function LeftFeildBarInput({
    width="100%",
    ...props
}) {
    return (
        <input 
            type="text" 
            className={styles.input}
            style={{width: width}}
        />
    )
}