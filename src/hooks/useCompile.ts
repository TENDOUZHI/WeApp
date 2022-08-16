import { useState } from "react";

interface vNode {
    tag: string,
    type: string,
    props: object,
    children: []
}

export const useCompile = (rootNode: any) => {
    // inital the virtual dom
    let vNode: vNode = {
        tag: rootNode.nodeName,
        type: 'root',
        props:{},
        children:[]
    }
    dfs(rootNode,vNode)
    // console.log(vNode);
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: any) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: any, index: any) => {
        // 同步到vNode的子节点
        const node: vNode = {
            tag: el.nodeName,
            type: el.id,
            props: {},
            children: []
        }
        vNode.children.push(node)
        dfs(el,vNode.children[index])
    });
    console.log(vNode);
}