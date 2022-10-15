import { selectTarget, targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { VNode } from '@/store/ast'
import { useSelector } from "react-redux";


export const useRenderer = (root: HTMLElement, vNode: VNode, dispatch: Dispatch) => {
    dfs(root, vNode, dispatch)
}

const dfs = (rootNode: HTMLElement | Node, vNode: VNode, dispatch: Dispatch) => {
    vNode.children.forEach((item: VNode, index: number) => {
        // console.log(item.name,item.tag_name);
        if (item.name !== '') {
            console.log(item);
            rootNode.appendChild(createNode(item, dispatch))
        }
        dfs(rootNode.childNodes[index], item, dispatch)

    })

}

const createNode = (vNode: VNode, dispatch: Dispatch): HTMLElement => {

    const curNode = document.createElement(vNode.tag_name)
    curNode.id = vNode.name
    curNode.innerText = vNode.content as string
    curNode.draggable = false
    curNode.classList.add(vNode.class as string)
    // console.log(curNode.tagName);
    // console.log(vNode);

    curNode.addEventListener('click', (e: MouseEvent) => {
        dispatch(targetSliceAction.captureTarget(e.target))
        // curNode.style.border = 'solid 2px #6188de'
    })
    for (const key in vNode.style) {
        if (Object.prototype.hasOwnProperty.call(vNode.style, key)) {
            let camel: string = ''
            if (key.includes('_')) {
                for (let i = 0; i < key.length; i++) {
                    if (key[i] === '_') {
                        camel = key.substring(0, i) + key[i + 1].toUpperCase() + key.substring(i + 2, key.length)
                    }
                }
            } else {
                camel = key
            }

            // @ts-ignore
            curNode.style[camel] = vNode.style[key]
        }
    }


    // setTimeout(() => {
    //     const cacheBorder = window.getComputedStyle(curNode).border
    //     // console.log(cacheBorder);
    //     document.addEventListener('click',(e: MouseEvent) => {
    //         if(e.target !== curNode) {
    //             curNode.style.border = cacheBorder
    //         }
    //     })
    // });


    return curNode
}
