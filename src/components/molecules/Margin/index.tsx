import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import './index.scss'
interface Props {
    target: HTMLElement
}
export const Margin = (props: Props) => {
    // align row column center
    const target = props.target
    const [marginTop, setMarginTop] = useGetValue('margin-top')
    const [marginBottom, setMarginBottom] = useGetValue('margin-bottom')
    const [marginLeft,setMarginLeft] = useGetValue('margin-left')
    const [marginRight, setMarginRight] = useGetValue('margin-right')
    return (
        <div className="attribute">
            <div className='attribute-title'>外边距</div>
            <div className="attribute-content">
                <StyleInput title='MT' value={marginTop} changeValue={setMarginTop} />
                <StyleInput title='MB' value={marginBottom} changeValue={setMarginBottom} />
                <StyleInput title='ML' value={marginLeft} changeValue={setMarginLeft} />
                <StyleInput title='MR' value={marginRight} changeValue={setMarginRight} />
            </div>

        </div>
    )
}