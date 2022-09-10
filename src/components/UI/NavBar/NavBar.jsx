import React from "react"
import { Link } from "react-router-dom"
import * as styles from "./NavBar.module.css" 

export default function NavBar({ pagesList }) {
    return (
        <nav>
            <div className={styles.outbox}>
                <div className={styles.box}>
                    <ul className={styles.navigation}>
                        {pagesList.map((page, index) => 
                            <li key={index}><Link to={page.url}>{page.name}</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}