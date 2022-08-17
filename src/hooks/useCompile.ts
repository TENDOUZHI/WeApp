import { selectSource, sourceSlice } from "@/store/source.slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Style } from "util";
import { useParseCss } from "./useParseCss";

interface vNode {
    tag: string,
    type: string,
    style: Style | object,
    children: Array<vNode>
}

export const useCompile = (rootNode: any) => {
    // inital the virtual dom
    let vNode: vNode = {
        tag: rootNode.nodeName,
        type: 'root',
        style:{},
        children:[]
    }
    dfs(rootNode,vNode)
    console.log(vNode);
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: any) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        // 同步到vNode的子节点
        const node: vNode = {
            tag: el.nodeName,
            type: el.id,
            style: useParseCss(el),
            children: []
        }
        vNode.children.push(node)
        dfs(el,vNode.children[index])
    });
}