export interface Vapp {
    project_name: string,
    routes: Array<routes>
}

export interface routes {
    id: number,
    name: string,
    vnode: vNode
}

export interface vNode {
    name: string,
    tag_name: string,
    class: string | null,
    style: Style | null,
    content: string | null,
    children: Array<vNode>
}

export interface Style {
    width: string
    height: string
    fontSize: string
    color: string
    marginTop: string
    marginBottom: string
    marginLeft: string
    marginRight: string
    paddingTop: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    borderRadius: string
    borderWidth: string
    borderColor: string
    backgroundColor: string
    opacity: string
    display: string
    flexDirection: string
    justifyContent: string
    justifyItems: string
    alignContent: string
    alignItems: string

}