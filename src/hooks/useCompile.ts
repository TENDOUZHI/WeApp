import { routes, vNode } from "@/store/routes.slice";
import { selectSource, sourceSlice } from "@/store/source.slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Style } from "util";
import { useParseCss } from "./useParseCss";

interface Vapp {
    project_name: string,
    routes: Array<routes>
}

//  to do list
//  first: finish auto save of current page
//  second: use redux to record vNode of every page, in order to impl create page 
//  third: merge them into one json stream

export const useCompile = (rootNode: any, width: number) => {
    // create project
    let Vapp: Vapp = {
        project_name: '',
        routes:[]
    }
    // initial routes
    let routes = [

    ]
    // inital the virtual dom
    let vNode: vNode = {
        name: 'root',
        style: useParseCss(rootNode,width),
        content: rootNode.nodeValue,
        children: []
    }
    dfs(rootNode, vNode, width)
    // console.log(vNode);
    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: any, width: number) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        // 同步到vNode的子节点
        let styles;
        if (el.innerText === undefined) {
            styles = null
        } else {
            styles = useParseCss(el,width)
        }
        const node: vNode = {
            name: el.id,
            style: styles,
            content: el.innerText,
            children: []
        }
        if (el.innerText !== undefined) {
            vNode.children.push(node)
            dfs(el, vNode.children[index], width)
        }
        

    });
}