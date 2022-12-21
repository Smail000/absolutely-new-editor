
import { createContext } from "react";
import createBlockDara from "./createBlockDara";

function findIdByCondition(array=[], condition=()=>{}) {
    for (let i=0;i< array.length;i++) {
        if (condition(array[i])) {
            return i
        }
    }
    return false
}

class BlockControlSystem {
    constructor (elements) {
        this.context = createContext()
        this.elements = elements
    }

    findBlock (condition=()=>false, root=false) {
        var pre
        for (let block of (root ? root.contains : this.elements.contains)) {
            if (condition(block)) {
                return block
            } else if (block.type === "event") {
                pre = this.findBlock(condition, root=block)
                if (pre) return pre
            }
        }
        return false
    }

    getChildrenIds(id) {
        var arr = []
        this.findBlock(block => {
            arr.push(arr)
        }, root=this.findBlock(block => block.id === id))
        return arr
    }

    hoverFind (x, y, width, height, id) {
        const selfPoints = [[x, y], [x+width, y], [x+width, y+height], [x, y+height]]
        return this.findBlock(block => {
            if (block.id === id) return false
            let blockPoints = [
                [block.position.pos_x, block.position.pos_y],
                [block.position.pos_x+block.size.width, block.position.pos_y+block.size.height]
            ]
            return selfPoints.map(point => 
                (blockPoints[0][0] <= point[0] && blockPoints[0][1] <= point[1]) &&
                (blockPoints[1][0] >= point[0] && blockPoints[1][1] >= point[1])
            ).includes(true)
        })
    }

    goto(from=false, to=false) {
        from = typeof from === "number" ? this.findBlock(block => block.id === from) : from
        to = to ? ( typeof to === "number" ? this.findBlock(block => block.id === to) : to ) : false
        
        if (!from || (!to.rootId && to.type === 'action')) return false

        // console.log(from.id)
        
        if (from.rootId) {
            this.findBlock(block => {
                if (block.id === from.rootId) {
                    // console.log(block.id, block.contains.map(elem => elem.id), from.id)
                    block.contains = block.contains.filter(block => block.id !== from.id)
                    // console.log(block.contains.map(elem => elem.id))
                    return true
                }
                return false
            })
        } else {
            this.elements.contains = this.elements.contains.filter(block => block.id !== from.id)
        }

        if (!to) {
            from.rootId = false
            this.elements.contains.push(from)
        } else {
            if (to.type === "action") {
                let toId = findIdByCondition(
                    this.findBlock(block => block.id === to.rootId).contains,
                    elem => elem.id === to.id
                )
                this.findBlock(block => {
                    if (block.id === to.rootId) {
                        from.rootId = to.rootId
                        block.contains.splice(toId+1, 0, from)
                        return true
                    }
                    return false
                })
            } else {
                this.findBlock(block => {
                    if (block.id === to.id) {
                        from.rootId = to.id
                        block.contains.splice(0, 0, from)
                        return true
                    }
                    return false
                })
            }
        }
        
        return true
    }

    getRootsOfRoot (rootId=false) {
        let root = rootId ? ( typeof rootId === "number" ? this.findBlock(block => block.id === rootId) : rootId ) : false
        var BlocksArray = []

        for (let block of (root ? root.contains : this.elements.contains)) {

            
            BlocksArray.push(block)
            if (block.type === "event") {
                for (let b of this.getRootsOfRoot(block)) {
                    BlocksArray.push(b)
                }
            }
        }

        return BlocksArray
    }

    setRootsOfRoot(rootId, stepX, margin) {
        let root = rootId ? ( typeof rootId === "number" ? this.findBlock(block => block.id === rootId) : rootId ) : false
        let i = 0

        let paddingY = margin
        for (let block of (root ? root.contains : this.elements.contains)) {
            
            if (root) {
                block.position.positionType = "sticky"
                block.rootId = root.id

                block.position.pos_x = root.position.pos_x + stepX
                block.position.pos_y = root.position.pos_y + root.size.height + paddingY  

                block.position.def_x = root.position.pos_x + stepX
                block.position.def_y = root.position.pos_y + root.size.height + paddingY  

                paddingY += block.size.height + margin
            } else {
                block.position.type = "free"
                block.position.def_x = block.position.pos_x
                block.position.def_y = block.position.pos_y
            }
            
            if (block.type === "event") {
                let [j, newPaddingY] = this.setRootsOfRoot(block, stepX, margin)
                paddingY += newPaddingY
                i += j
            }

            i++
        }
        return [i, paddingY-margin]
    }

    countHeight(id, margin) {
        let height = margin
        for (let block of this.getRootsOfRoot(id)) {
            height += (margin + block.size.height)
        }
        return height
    }

}


export const Context = createContext()
export default BlockControlSystem
