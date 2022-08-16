import { StyleInput } from "@/components/atoms/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import './index.scss'

interface Props {
    target: HTMLElement
}
export const Border = (props: Props) => {
    const target = props.target
    const [borderWidth, setBorderWidth] = useGetValue('border-width')
    const [borderColor, setBorderColor] = useGetValue('border-color')

    return (
        <div className="attribute">
            <div className='attribute-title'>边框</div>
            <div className="attribute-content">
                <StyleInput tip='边框宽度' title="BW" value={borderWidth} changeValue={setBorderWidth}/>
                <StyleInput tip='边框颜色' title="BC" value={borderColor} changeValue={setBorderColor}/>
            </div>
        </div>
    )
}