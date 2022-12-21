import * as ActionStyle from "./blockStyle/Action.module.css"
import * as EventStyle from "./blockStyle/Event.module.css"

export function createBlock({
    ...kwargs
}) {
    let id = Math.random()
    return {
        name: kwargs.name ||               "Test",
        discription: kwargs.discription || "Test component",

        id:                                 id, // dont change
        rootId: kwargs.rootId ||            false, // dont change

        props: kwargs.props ||              {},
        requires: kwargs.requires ||        {},
        contains: kwargs.contains ? kwargs.contains.map(block => block.rootId = id) : [],

        collapse: kwargs.collapse ||        false,

        type: kwargs.type ||                "",
        from: kwargs.from ||                false,

        // Style without position (left and top)
        style: kwargs.style || {
            className:                      "",
            data: {
                position:                   "absolute",
            },
        },

        size: kwargs.size || {
            width:                          0,
            height:                         0,

        },

        position: kwargs.position || {
            type:                           "free",
            
            pos_x:                          0,
            pos_y:                          0,

            def_x:                          0,
            def_y:                          0,
        },

        hover: {                            // dont change
            hovered:                        false,
            hoveredBlockId:                 false,
            lastHoveredBlockId:             false,
        },

        hoverStyle: kwargs.hoverStyle || {
            className:                      "",
            data:                           {},
        },

        beforeStyle: kwargs.beforeStyle || {
            className:                      "",
            data:                           {},
        },

        afterStyle: kwargs.afterStyle || {
            className:                      "",
            data:                           {},
        }
    }
}

export function createActionBlock ({
    name="ActionBlock",
    ...kwargs
}) {
    return createBlock({
        name: name,
        type: "action",
        style: {
            className: ActionStyle.self,
            data: {}
        },
        size: {
            width: 143,
            height: 30,
        },
        position: {
            type: "free",
            pos_x: 70,
            pos_y: 70,
            def_x: 70,
            def_y: 70,
        },
        hoverStyle: {
            className: ActionStyle.hovered,
            data: {}
        },
        afterStyle: {
            className: EventStyle.horisLine,
            data: {},
        }
    })
}

export function createEventBlock ({
    ...kwargs
}) {
    return createBlock({
        name: "EventBlock",
        type: "event",
        style: {
            className: EventStyle.self,
            data: {}
        },
        size: {
            width: 202,
            height: 48,
        },
        position: {
            type: "free",
            pos_x: 70,
            pos_y: 70,
            def_x: 70,
            def_y: 70,
        },
        hoverStyle: {
            className: EventStyle.hovered,
            data: {}
        },
        beforeStyle: {
            className: EventStyle.vertLine,
            data: {},
        },
        afterStyle: {
            className: EventStyle.horisLine,
            data: {},
        }
    })
}

export function createDataBlock ({
    ...kwargs
}) {
    let block = createBlock(...kwargs)
}