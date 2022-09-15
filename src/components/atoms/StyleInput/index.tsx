import { selectTarget, targetSliceAction } from '@/store/target.slice'
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
interface Props {
    title: string
    value: string
    tip: string
    type?: string
    changeValue: ((value: string) => void)
    ifValue?: ((value: string) => void)
}
export const StyleInput = (props: Props) => {
    const dispatch = useDispatch()
    const wrapper = useRef<any>(null)
    const [Ivalue, setValue] = useState<string>(props.value)
    let target = useSelector(selectTarget) as HTMLElement
    // after select el show the data
    useEffect(() => {
        if (props.type === 'color') {
            setValue(parseColor(props.value))
        } else {
           setValue(props.value) 
        }
        
    }, [props.value, target])
    const parseColor = (color: string) => {
        var reg = /^(rgb|RGB)/;
        if (reg.test(color)) {
            var strHex = "#";
            // 把RGB的3个数值变成数组
            var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            // 转成16进制
            for (var i = 0; i < colorArr.length; i++) {
                var hex = Number(colorArr[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            return strHex;
        } else {
            return String(color);
        }
    }
    const focusInput = () => {
        wrapper.current.classList.add('item-focus')
    }
    const blurInput = () => {
        wrapper.current.classList.remove('item-focus')
        if (Ivalue[Ivalue.length - 1] === '%' || Ivalue[0] === '#') {
            props.changeValue(Ivalue)
        } else {
            props.changeValue(Ivalue)
            if (props.ifValue) {
                props.ifValue(Ivalue)
            }
            // const dispatch = useDispatch()
            // dispatch(targetSliceAction.captureTarget(target))
        }
    }
    const updateValue = (e: { target: { value: any } }) => {
        setValue(e.target.value)
        // props.changeValue(e.target.value)
    }

    const resetTarget = () => {
        dispatch(targetSliceAction.updateState(false))
    }

    return (
        <div className="input-wrapper" ref={wrapper} onClick={resetTarget}>
            <div className="input-title">{props.title}</div>
            <input type={props.type} className='input-item' value={Ivalue} onChange={updateValue} onFocus={focusInput} onBlur={blurInput} />
            <div className="tip">{props.tip}</div>
        </div>
    )
}
