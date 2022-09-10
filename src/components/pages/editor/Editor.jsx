import React from "react"
import range from "../../tools/range"
import randomRange from "../../tools/randomRange"
import * as styles from "./Editor.module.css"

export default function Editor(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.playground}>
                {randomRange(0, 100, 30, 70).map(num => 
                    <div className={styles.obj} style={{width: num}} draggable={true} key={num}></div>    
                )}
            </div>
        </div>
    )
}