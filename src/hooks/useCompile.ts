import { selectSource, sourceSlice } from "@/store/source.slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Style } from "util";
import { useParseCss } from "./useParseCss";

interface vNode {
    name: string,
    style: Style | object,
    content: string | null,
    children: Array<vNode>
}

export const useCompile = (rootNode: any) => {
    // inital the virtual dom
    let vNode: vNode = {
        name: 'root',
        style: useParseCss(rootNode),
        content: rootNode.nodeValue,
        children: []
    }
    dfs(rootNode, vNode)
    // console.log(vNode);
    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: any) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        // 同步到vNode的子节点
        const node: vNode = {
            name: el.id,
            style: useParseCss(el),
            content: el.innerText,
            children: []
        }
        vNode.children.push(node)
        if(el.innerText === '') {
            dfs(el, vNode.children[index])
        }
        
    });
}