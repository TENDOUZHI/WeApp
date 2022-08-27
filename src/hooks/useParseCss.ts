import { useRpx } from "./useRpx"

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
    borderWidth:string
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

export const useParseCss = (el: HTMLElement,width: number): Style => {

    
    const style: Style = {
        width: window.getComputedStyle(el).width,
        height: window.getComputedStyle(el).height,
        fontSize:window.getComputedStyle(el).fontSize,
        color: window.getComputedStyle(el).color,
        marginTop:window.getComputedStyle(el).marginTop,
        marginBottom:window.getComputedStyle(el).marginBottom,
        marginLeft: window.getComputedStyle(el).marginLeft,
        marginRight: window.getComputedStyle(el).marginRight,
        paddingTop:window.getComputedStyle(el).paddingTop,
        paddingBottom:window.getComputedStyle(el).paddingBottom,
        paddingLeft:window.getComputedStyle(el).paddingLeft,
        paddingRight:window.getComputedStyle(el).paddingRight,
        borderRadius: window.getComputedStyle(el).borderRadius,
        borderWidth: window.getComputedStyle(el).borderWidth,
        borderColor: window.getComputedStyle(el).borderColor,
        backgroundColor:window.getComputedStyle(el).backgroundColor,
        opacity: window.getComputedStyle(el).opacity,
        display: window.getComputedStyle(el).opacity,
        flexDirection:window.getComputedStyle(el).flexDirection,
        justifyContent: window.getComputedStyle(el).justifyContent,
        justifyItems:window.getComputedStyle(el).justifyItems,
        alignContent:window.getComputedStyle(el).alignContent,
        alignItems:window.getComputedStyle(el).alignItems
    }
    for (let key in style) {
        // @ts-ignore
        const value: string = style[key]
        let tail = value[value.length - 2] + value[value.length - 1]
        if (tail === 'px') {
            const px = Number(value.substring(0,value.length - 2))
            const rpx = useRpx(px,width)  
            const value_rpx = rpx.toString() + 'rpx'
            // @ts-ignore
            style[key] = value_rpx
        }
        
        
    }
    return style
}