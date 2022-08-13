import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { useEffect, useState } from 'react'
import './index.scss'
interface Props {
    target: HTMLElement
}
export const Basicstyle = (props: Props) => {
    // width height border-radious angel margin padding
    const target = props.target
    const [width,setWidth] = useGetValue(target, 'width')
    const [height,setHeight] = useGetValue(target, 'height')
    const [borderRadius,setBorderRadius] = useGetValue(target, 'border-radius')

    return (
        <div className="attribute">
            <div className='attribute-title'>布局</div>
            <div className="attribute-content">
                <StyleInput title='W' value={width} changeValue={setWidth} />
                <StyleInput title='H' value={height} changeValue={setHeight} />
                <StyleInput title='R' value={borderRadius} changeValue={setBorderRadius} />
            </div>

        </div>
    )
}