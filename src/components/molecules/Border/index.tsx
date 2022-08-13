import { StyleInput } from "@/components/atoms/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import './index.scss'

interface Props {
    target: HTMLElement
}
export const Border = (props: Props) => {
    const target = props.target
    const [borderWidth, setBorderWidth] = useGetValue(target, 'border-width')
    const [borderColor, setBorderColor] = useGetValue(target, 'border-color')

    return (
        <div className="attribute">
            <div className='attribute-title'>边框</div>
            <div className="attribute-content">
                <StyleInput title="BW" value={borderWidth} changeValue={setBorderWidth}/>
                <StyleInput title="BC" value={borderColor} changeValue={setBorderColor}/>
            </div>
        </div>
    )
}