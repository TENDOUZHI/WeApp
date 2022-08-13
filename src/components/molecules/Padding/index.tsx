import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import './index.scss'
interface Props {
    target: HTMLElement
}
export const Padding = (props: Props) => {
    // align row column center
    const target = props.target
    const [paddingTop, setpaddingTop] = useGetValue(target, 'padding-top')
    const [paddingBottom, setpaddingBottom] = useGetValue(target, 'padding-bottom')
    const [paddingLeft,setpaddingLeft] = useGetValue(target, 'padding-left')
    const [paddingRight, setpaddingRight] = useGetValue(target, 'padding-right')
    return (
        <div className="attribute">
            <div className='attribute-title'>内边距</div>
            <div className="attribute-content">
                <StyleInput title='PT' value={paddingTop} changeValue={setpaddingTop} />
                <StyleInput title='PB' value={paddingBottom} changeValue={setpaddingBottom} />
                <StyleInput title='PL' value={paddingLeft} changeValue={setpaddingLeft} />
                <StyleInput title='PR' value={paddingRight} changeValue={setpaddingRight} />
            </div>

        </div>
    )
}