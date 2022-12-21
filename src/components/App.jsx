
import React, { useState } from "react"

import BarBase from "./UI/BarBase/BarBase"
import Icon from "./UI/Icon/Icon"
import Dropdown from "./UI/Dropdown/Dropdown"
import TaskBarButton from "./UI/TaskBarButton/TaskBarButton"
import InvisibleButtonWithIcon from "./UI/InvisibleButtonWithIcon/InvisibleButtonWithIcon"
import LeftFeildBarInput from "./UI/LeftFeildBarInput/LeftFeildBarInput"

import Play from "../assets/icons/play.png"
import Back from "../assets/icons/back.png"
import Cross from "../assets/icons/cross.png"
import Settings from "../assets/icons/settings.png"

import Notes from "../assets/icons/notes.png"
import Parameters from "../assets/icons/parameters.png"
import Layers from "../assets/icons/layers.png"
import Blocks from "../assets/icons/blocks.png"

import Search from "../assets/icons/search.png"
import More from "../assets/icons/more.png"

import styles from "./App.module.css"

var arrayOfTaskBarIcons = [Blocks, Layers,  Parameters, Notes]

export default function App(props) {

    const [FeildBarMarkDown, setFeildBarMarkDown] = useState({
        left: 0,
        right: 1,
    })

    function onClickTaskBarButton (id, side) {
        var obj = {...FeildBarMarkDown}
        obj[side] = id
        if (obj.left === obj.right) {
            if (obj.left === FeildBarMarkDown.left) {
                obj.left = FeildBarMarkDown.right
            } else {
                obj.right = FeildBarMarkDown.left
            }
        }
        setFeildBarMarkDown(obj)
    }

    const FakeBlockData = {
        name: "test",
        discription: "no discription",
        isActive: false
    }

    return (
        <div className={styles.screen} style={{backgroundColor: "#F4F9FD"}}>

            {/* Top Bar */}
            <div className={styles.topbar_wrapper}>
                <BarBase className={styles.topbar}>

                    <div className={styles.topbar__lefticonsgroup}>
                        <InvisibleButtonWithIcon src={Back} alt="Quit editor" size={30}/>
                        <InvisibleButtonWithIcon src={Settings} alt="Editor settings" size={30} style={{marginLeft: "10px", marginRight: "200px"}}/>
                    </div>

                    <span>Project Name</span>

                    <div className={styles.topbar__dropdowngroup}>
                        <Dropdown text="Logic Editor" style={{marginRight: "50px"}} />
                        <Dropdown text="Page 1" />
                    </div>

                    <div className={styles.topbar__righticonsgroup}>
                        <InvisibleButtonWithIcon src={Play} alt="Run project" size={30}/>
                    </div>
                </BarBase>
            </div>

            {/* Task Bar Group */}
            <div className={styles.taskbargroup}>
                {/* Left Feild Bar */}
                <BarBase className={styles.taskbargroup__leftfeildbar}>
                    {[0, 1, 2, 3].map(id => 
                        <TaskBarButton 
                            arrayOfIcons={arrayOfTaskBarIcons}
                            size={"40px"}
                            id={id} 
                            key={id} 
                            side="left" 
                            isActive={id == FeildBarMarkDown.left} 
                            onClick={onClickTaskBarButton}
                        />
                    )}
                </BarBase>

                {/* Task Bar */}
                <BarBase className={styles.taskbargroup__taskbar}>
                    {/* Task Bar */}
                </BarBase>

                {/* Right Feild Bar */}
                <BarBase className={styles.taskbargroup__rightfeildbar}>
                    {[0, 1, 2, 3].map(id => 
                        <TaskBarButton
                            arrayOfIcons={arrayOfTaskBarIcons}
                            size={"40px"}
                            id={id} 
                            key={id} 
                            side="right" 
                            isActive={id == FeildBarMarkDown.right} 
                            onClick={onClickTaskBarButton}
                        />
                    )}
                </BarBase>
            </div>

            {/* Center Bar Group */}
            <div className={styles.centerbargroup}>
                {/* Left Bar */}
                <BarBase className={styles.centerbargroup__leftbar}>
                    <div className={styles.centerbargroup__leftbar__search}>
                        <InvisibleButtonWithIcon src={Search} alt="Click to search" size={30} style={{marginRight: 5}}/>
                        <LeftFeildBarInput width="80%"/>
                    </div>

                    <div>
                        
                    </div>
                </BarBase>

                {/* Block Bar */}
                <BarBase className={styles.centerbargroup__blockbar}>
                    {/* BLOCK BAR */}
                </BarBase>

                {/* Right Feild Bar */}
                <BarBase className={styles.centerbargroup__rightbar}>
                    <h3 align="center">Parameters</h3>
                    {Object.keys(FakeBlockData).map((key, index) => 
                        <div key={index} style={{marginBottom: 7, marginLeft: 10}}>
                            <span>{key}</span>&nbsp;:&nbsp;<span>{FakeBlockData[key].toString()}</span>
                        </div>
                    )}
                </BarBase>
            </div>

        </div>
    )
}