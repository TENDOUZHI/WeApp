import { useEffect, useRef, useState } from 'react'
import './index.scss'
interface Props {
    value: string,
    setValue: ((value: string) => void)
    placeholder: string,
    input_type: string,
    show: boolean,
    passcode: boolean
    error: boolean
}
export const Input = (props: Props) => {
    const frame = useRef<any>()
    const input = useRef<any>()
    const root = useRef<any>()
    const error = useRef<any>()
    useEffect(() => {
        if (props.show) {
            root.current.classList.remove('hide')
            root.current.classList.add('forminput')
        } else {
            root.current.classList.add('hide')
            root.current.classList.remove('forminput')
        }
        if(props.error) error.current.classList.add('show-error')
        else error.current.classList.remove('show-error')
        
    })
    const focusInput = () => {
        frame.current.classList.add('normal_input')
        frame.current.classList.add('focus')
        frame.current.classList.remove('hover')
    }
    const blurInput = () => {
        frame.current.classList.remove('normal_input')
        frame.current.classList.remove('focus')
        if (props.value === '') {
            frame.current.classList.add('error_input')
        } else {
            frame.current.classList.add('normal_input')
            frame.current.classList.remove('error_input')
        }
    }
    const changeValue = (e: { target: { value: any } }) => {
        props.setValue(e.target.value)
    }

    return (
        <div className="hide" ref={root}>
            <div className="forminput-all hover" ref={frame}>
                <div className="forminput-all-wrapper">
                    <input className="forminput-all-wrapper-input"
                        onChange={changeValue}
                        value={props.value}
                        onFocus={focusInput}
                        onBlur={blurInput}
                        ref={input}
                        placeholder={props.placeholder}
                        type={props.input_type} />
                    {props.passcode &&
                        <div className="forminput-all-wrapper-passcode">获取验证码</div>}
                </div>
            </div>
            <div className="forminput-error-msg" ref={error}>格式不正确</div>
        </div>
    )
}