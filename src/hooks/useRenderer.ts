import { targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import {vNode} from '@/store/ast'


export const useRenderer = (root: HTMLElement, vNode: vNode, dispatch: Dispatch) => {
    dfs(root,vNode, dispatch)
}

const dfs = (rootNode: HTMLElement | Node, vNode: vNode, dispatch: Dispatch) => {
    vNode.children.forEach((item: vNode,index: number) => {
        rootNode.appendChild(createNode(item,dispatch))
        dfs(rootNode.childNodes[index],item,dispatch)
    })
    
}

const createNode = (vNode: vNode, dispatch: Dispatch): HTMLElement => {
    const curNode = document.createElement(vNode.tagName)
    curNode.id = vNode.name
    curNode.innerText = vNode.content as string
    curNode.draggable = false
    curNode.classList.add(vNode.class as string)
    curNode.addEventListener('click', (e: MouseEvent) => {
        dispatch(targetSliceAction.captureTarget(e.target))
    })
    for (const key in vNode.style) {
        if (Object.prototype.hasOwnProperty.call(vNode.style, key)) {
            // @ts-ignore
            curNode.style[key] = vNode.style[key]
        }
    }
    // curNode.style.width = vNode.style?.width as string
    // console.log(vNode.style?.width);
    
    return curNode
}
