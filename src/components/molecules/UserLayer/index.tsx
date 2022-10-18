import { MouseEvent, useLayoutEffect, useRef, useState } from 'react'
import './index.scss'
export type editInfo = 'avatar' | 'username' | 'email' | 'telephone'
interface Props {
    type: editInfo,
    show: boolean,
    setShow: ((value: boolean) => void)
}
export const UserLayer = (props: Props) => {
    const layer = useRef<any>()
    const main = useRef<any>()
    const [title, setTitle] = useState<string>(() => {
        switch (props.type) {
            case 'avatar':
                return '修改头像'
            case 'username':
                return '修改用户名'
            case 'email':
                return '绑定邮箱'
            case 'telephone':
                return '绑定手机号'
            default:
                return ''
        }
    })
    const hide = (e: MouseEvent) => {
        if (e.target !== main.current) {
            props.setShow(false)
        }
    }
    useLayoutEffect(() => {
        setTimeout(() => {
            main.current.classList.add('main_show')
        })
    })
    return (
        <div className="userlayer">
            <div className="userlayer_main" ref={main}>
                <header className='userlayer_main_header'>
                    <div className="userlayer_main_header_title">{title}</div>
                    <div className="userlayer_main_header_btn" onClick={hide}>x</div>
                </header>
            </div>
            <div className="userlayer_shadow" ref={layer} onClick={hide}></div>
        </div>
    )
}