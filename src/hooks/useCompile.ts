import { routes, vNode, Vapp } from "@/store/ast";
import { useParseCss } from "./useParseCss";

//  to do list
//  first: finish auto save of current page
//  second: use redux to record vNode of every page, in order to impl create page 
//  third: merge them into one json stream

export const useCompile = (rootNode: any, width: number, isRpx: boolean) => {
    // create project
    let Vapp: Vapp = {
        project_name: '',
        routes: []
    }
    // initial routes
    let routes = [

    ]
    // inital the virtual dom
    let vNode: vNode = {
        name: 'root',
        class: rootNode.classList[0],
        tagName: rootNode.tagName,
        style: useParseCss(rootNode, width, isRpx),
        content: rootNode.nodeValue,
        children: []
    }
    dfs(rootNode, vNode, width, isRpx)
    // console.log(vNode);
    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: vNode, width: number, isRpx: boolean) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        // 同步到vNode的子节点
        let styles;
        let curClass;
        if (el.innerText === undefined) {
            styles = null
            curClass = null
        } else {
            styles = useParseCss(el, width, isRpx)
            curClass = el.classList[0]
        }
        const node: vNode = {
            name: el.id,
            class: curClass,
            tagName: el.tagName,
            style: styles,
            content: el.innerText,
            children: []
        }
        if (el.innerText !== undefined) {
            vNode.children.push(node)
            dfs(el, vNode.children[index], width, isRpx)
        }
    });
}