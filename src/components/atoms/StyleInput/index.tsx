import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import './index.scss'
interface Props {
    title: string
    value: string
    changeValue: ((value: string) => void)
}
export const StyleInput = (props: Props) => {
    const wrapper = useRef<any>(null)
    const [Ivalue, setValue] = useState<string>(props.value)
    useEffect(() => {
        setValue(props.value)
    },[props.value])
    const focusInput = () => {
        wrapper.current.classList.add('item-focus')
    }
    const blurInput = () => {
        wrapper.current.classList.remove('item-focus')
        if(Ivalue[Ivalue.length-1] === '%' || Ivalue[0] === '#') {
            props.changeValue(Ivalue)
        } else {
            props.changeValue(Ivalue)
        }
        
    }
    const updateValue = (e: {target: {value: any}}) => {
        setValue(e.target.value)
        // props.changeValue(e.target.value)
    }

    return (
        <div className="input-wrapper" ref={wrapper}>
            <div className="input-title">{props.title}</div>
            <input type="text" className='input-item' value={Ivalue} onChange={updateValue} onFocus={focusInput} onBlur={blurInput} />
        </div>
    )
}