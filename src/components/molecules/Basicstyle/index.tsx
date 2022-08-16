import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { useEffect, useState } from 'react'
import './index.scss'
interface Props {
    target: HTMLElement
}
export const Basicstyle = (props: Props) => {
    // width height border-radious angel margin padding
    // const target = props.target.style.content
    const [width,setWidth] = useGetValue('width')
    const [height,setHeight] = useGetValue('height')
    const [borderRadius,setBorderRadius] = useGetValue('border-radius')
    const [fontSize, setFontSize] = useGetValue('font-size')
    const [color, setColor] = useGetValue('color')
    const [content, setContent] = useGetValue('content')
    return (
        <div className="attribute">
            <div className='attribute-title'>布局</div>
            <div className="attribute-content">
                <StyleInput title='W' value={width} changeValue={setWidth} />
                <StyleInput title='H' value={height} changeValue={setHeight} />
                <StyleInput title='R' value={borderRadius} changeValue={setBorderRadius} />
                <StyleInput title='FZ' value={fontSize} changeValue={setFontSize} />
                <StyleInput title='FC' value={color} changeValue={setColor} />
                <StyleInput title='C' value={content} changeValue={setContent} />
            </div>

        </div>
    )
}