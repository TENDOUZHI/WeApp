import { StyleInput } from "@/components/atoms/StyleInput"
import { useGetValue } from "@/hooks/useGetValue"
import './index.scss'

interface Props {
    target: HTMLElement
}
export const Bgc = (props: Props) => {
    const target = props.target
    const [bgc, setBgc] = useGetValue('background-color')
    const [opacity, setOpacity] = useGetValue( 'opacity')

    return (
        <div className="attribute">
            <div className='attribute-title'>填充</div>
            <div className="attribute-content">
                <StyleInput title="Bgc" value={bgc} changeValue={setBgc}/>
                <StyleInput title="op" value={opacity} changeValue={setOpacity}/>
            </div>
        </div>
    )
}