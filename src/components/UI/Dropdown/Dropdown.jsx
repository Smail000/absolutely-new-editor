import React from "react";
import styles from "./Dropdown.module.css"
import Icon from "../Icon/Icon";

import DropdownIcon from "../../../assets/icons/dropdown.png"

export default function Dropdown({
    text="No text",
    ...props
}) {
    return (
        <div className={styles.dropdown} {...props}>
            <span>{text}</span>
            <Icon src={DropdownIcon} alt="Click to show"/>
        </div>
    )
}