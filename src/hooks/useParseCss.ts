import { Style } from "@/store/ast"
import { useRpx } from "./useRpx"

export const useParseCss = (el: HTMLElement, width: number | null, isRpx: boolean): Style => {


    const style: Style = {
        width: window.getComputedStyle(el).width,
        height: window.getComputedStyle(el).height,
        fontSize: window.getComputedStyle(el).fontSize,
        color: window.getComputedStyle(el).color,
        marginTop: window.getComputedStyle(el).marginTop,
        marginBottom: window.getComputedStyle(el).marginBottom,
        marginLeft: window.getComputedStyle(el).marginLeft,
        marginRight: window.getComputedStyle(el).marginRight,
        paddingTop: window.getComputedStyle(el).paddingTop,
        paddingBottom: window.getComputedStyle(el).paddingBottom,
        paddingLeft: window.getComputedStyle(el).paddingLeft,
        paddingRight: window.getComputedStyle(el).paddingRight,
        borderRadius: window.getComputedStyle(el).borderRadius,
        borderWidth: window.getComputedStyle(el).borderWidth,
        borderColor: window.getComputedStyle(el).borderColor,
        backgroundColor: window.getComputedStyle(el).backgroundColor,
        opacity: window.getComputedStyle(el).opacity,
        display: window.getComputedStyle(el).opacity,
        flexDirection: window.getComputedStyle(el).flexDirection,
        justifyContent: window.getComputedStyle(el).justifyContent,
        justifyItems: window.getComputedStyle(el).justifyItems,
        alignContent: window.getComputedStyle(el).alignContent,
        alignItems: window.getComputedStyle(el).alignItems
    }
    if (isRpx) {
        for (let key in style) {
            // @ts-ignore
            const value: string = style[key]
            let tail = value[value.length - 2] + value[value.length - 1]
            if (tail === 'px') {
                const px = Number(value.substring(0, value.length - 2))
                const rpx = useRpx(px, width as number)
                const value_rpx = rpx.toString() + 'rpx'
                // @ts-ignore
                style[key] = value_rpx
            }
        }
    }

    return style
}