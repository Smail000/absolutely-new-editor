import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Context } from "../../tools/blockControlSystem";
import GlobalVarsContext from "../../tools/GlobalVarsContext";

export default function AutoBlock ({ 
        self={},
        parentRender=()=>{},
        ...props 
}) {
    
    // Block variables
    const System = useContext(Context)
    const itemRef = useRef(null)

    var toRender = false
    
    const [globalVars, setGlobalVars] = useContext(GlobalVarsContext)

    var {
        name, discription, id, rootId, props, requires, contains,
        collapse, style, size, position, hover, hoverStyle, type,
        beforeStyle, afterStyle,
    } = self

    if (type === "event") var allRoots = System.getRootsOfRoot(self).map(block => block.id)

    // console.log()
    // console.log(id, type, position.pos_x, position.pos_y)

    function hoverMiddleware (x, y) {
        hover.hoveredBlockId = System.hoverFind(x, y, size.width, size.height, id).id || false
        if (hover.hoveredBlockId !== hover.lastHoveredBlockId) {
            if (hover.lastHoveredBlockId) {
                System.findBlock(block => {
                    if (block.id === hover.lastHoveredBlockId) {
                        block.hover.hovered = false
                        toRender = true
                        return true
                    }
                    return false 
                })
            }

            if (hover.hoveredBlockId) {
                System.findBlock(block => {
                    if (block.id === hover.hoveredBlockId) {
                        block.hover.hovered = true
                        toRender = true
                        return true
                    }
                    return false 
                })
            }

            hover.lastHoveredBlockId = hover.hoveredBlockId
        }
    }

    function toRenderMiddleware() {
        if (toRender) {
            toRender = false
            parentRender({})
        }
    }

    return (
        <Draggable 
            bounds="parent"

            onMouseDown={() => {
                if (globalVars.markdown !== id) {
                    setGlobalVars({markdown: id})
                }
                toRenderMiddleware()
            }}

            onStart={() => {}}
            onDrag={(e, positionDrag) => {

                if (position.type === "disabled") return

                hoverMiddleware(positionDrag.x, positionDrag.y)

                if ((positionDrag.x !== position.pos_x || positionDrag.y !== position.pos_x)) {
                    System.findBlock(block => {
                        if (block.id === id) {
                            block.position.pos_x = positionDrag.x
                            block.position.pos_y = positionDrag.y
                            block.hover.hoveredBlockId = hover.hoveredBlockId
                            block.hover.lastHoveredBlockId = hover.lastHoveredBlockId
                            return true
                        }
                        return false 
                    })
                    if (type === "event") System.setRootsOfRoot(id, globalVars.stepX, globalVars.margin)
                    toRender = true
                }

                toRenderMiddleware()
            }}

            onStop={() => {

                if (position.type === "disabled") return

                if (position.pos_x !== position.def_x && position.pos_y !== position.def_y) 
                System.goto(from=id, to=(hover.lastHoveredBlockId || hover.hoveredBlockId))

                if (hover.hoveredBlockId || hover.lastHoveredBlockId) {
                    System.findBlock(block => {
                        if ((block.id === hover.hoveredBlockId) || block.id === hover.lastHoveredBlockId) {
                            block.hover.hovered = false
                        }

                        if (block.id === id) {
                            block.hover.hoveredBlockId = false
                            block.hover.lastHoveredBlockId = false
                        }
                        return false 
                    })
                }

                // console.log(id, hover.lastHoveredBlockId, hover.hoveredBlockId)
                

                System.setRootsOfRoot(false, globalVars.stepX, globalVars.margin)
                toRender = true
                toRenderMiddleware()
            }}
            
            position={{x: position.pos_x, y: position.pos_y}}
        >
            <div
                style={{
                    height: size.height, width: size.width, 
                    zIndex: globalVars.markdown === id ? 3 : 2,
                    ...style.data
                }}
                ref={itemRef}
                className={[
                    (hover.hovered ? hoverStyle.className : ""),
                    style.className
                ].join(" ")}
            >
                
                { (type === "event" && contains.length !== 0) ? 
                <div className={beforeStyle.className} style={{
                    zIndex: 1,
                    height: System.countHeight(id, globalVars.margin)+2,
                    top: size.height-2,
                    left: globalVars.stepX/2
                }} /> : "" }

                { (rootId && ((position.def_x === position.pos_x) && (position.def_y === position.pos_y))) ? 
                <div className={afterStyle.className} style={{
                    zIndex: 1,
                    width: globalVars.stepX/2+1,
                    top: size.height/2,
                    left: -globalVars.stepX/2
                }} /> : "" }


                <p style={{fontWeight: globalVars.markdown === id ? "bold" : "normal"}}>{name}</p>
            </div>
        </Draggable>
    )
}