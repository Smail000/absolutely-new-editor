import React from "react";
import Draggable from "react-draggable";

export default function Dragable({ children, bounds=NaN }) {
    return (
        // <Draggable
        //     axis="x"
        //     handle=".handle"
        //     defaultPosition={{x: 0, y: 0}}
        //     position={null}
        //     grid={[25, 25]}
        //     scale={1}
        //     onStart={function(){}}
        //     onDrag={function(){}}
        //     onStop={function(){}}>
        //     {children}
        // </Draggable>
        <Draggable
            // defaultPosition={{x: 0, y: 0}}
            // position={null}
            // scale={1}
            bounds={bounds}
            onStart={function(){}}
            onDrag={function(){}}
            onStop={function(){}}>
            {children}
        </Draggable>
    )
}