import React, { useEffect, useState } from "react"

import * as styles from "./Editor.module.css"

import Button from "../UI/BottomBarButton/Button"


import GobalVarsContext from "../tools/GlobalVarsContext"
import createBlockDara, { createActionBlock, createEventBlock } from "../tools/createBlockDara"

import AutoBlock from "./BlocksComponents/AutoBlock"


import BlockControlSystem, { Context } from "../tools/blockControlSystem"

export default function Editor(props) {

    const [globalVars, setGlobalVars] = useState({
        markdown: false,
        margin: 12,
        stepX: 40,
    })

    const [componentsList, setComponentsList] = useState({
        contains: []
    })
    const [, forceRender] = useState()

    // console.log("Rendered")

    const System = new BlockControlSystem(componentsList, setComponentsList)
    window.System = System

    return (
        <Context.Provider value={System}>
            <GobalVarsContext.Provider value={[globalVars, (obj={}) => setGlobalVars({...globalVars, ...obj})]}>
                <div className={styles.self}>
                    
                </div>
            </GobalVarsContext.Provider>
        </Context.Provider>
    )
}



/*
{ System.getRootsOfRoot(false, globalVars.stepX, globalVars.margin).map(elem => 
    <AutoBlock self={elem} key={elem.id} parentRender={forceRender}/>
)}

<div className={styles.taskbar}>
    <Button value="🟢" title="Параметры запуска" onClick={() => setComponentsList({contains: [...componentsList.contains, createActionBlock({})]})}/>
    <Button value="🠋" title="Скачать код" onClick={()=> setComponentsList({contains: [...componentsList.contains, createEventBlock({})]})}/>
    <Button value="⚙" title="Настройки" onClick={() => forceRender({})}/>
    <Button value="?" title="Помощь" onClick={() => {
        componentsList.contains.push(...[
            createBlockDara(type="event", contains=[])
        ])
        System.setRootsOfRoot(false, globalVars.stepX, globalVars.margin)
        forceRender({})
    }}/>
    <Button value="✖" title="Выйти" onClick={() => setComponentsList({contains: [...componentsList.contains, createActionBlock({name: "Залупа"})]})}/>
</div>
*/