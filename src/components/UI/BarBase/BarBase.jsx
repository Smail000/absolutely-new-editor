import React from "react";
import styles from "./BarBase.module.css"

export default function BarBase ({
    children,
    className="",
    style={},
    ...props
}) {

    var mainColors = {
        dark: "#213455",
        text: "#4E648B",
        mid: "#8197BC",
        markdown: "#BACEE6",
        light: "#F4F9FD",

    }

    return (
        <div 
            style={{
                backgroundColor: mainColors.light,
                borderColor: mainColors.mid,
                color: mainColors.text,
                ...style
            }}
            className={[styles.barbase, className].join(" ").trim()} 
        >
            {children}
        </div>
    )
}