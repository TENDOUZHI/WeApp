import { selectUser } from '@/store/user.slice'
import { MouseEvent, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
export type editInfo = 'avatar' | 'username' | 'email' | 'telephone'
interface Props {
    type: editInfo,
    show: boolean,
    setShow: ((value: boolean) => void)
}
export const UserLayer = (props: Props) => {
    const user = useSelector(selectUser)
    const layer = useRef<any>()
    const main = useRef<any>()
    const [username, setUsername] = useState<string>(user.username)
    const [password, setPassword] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [tel, setTel] = useState<string>('')
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
    const usernameOnChange = (e: { target: { value: any } }) => {
        setUsername(e.target.value)
    }
    const mailOnChange = (e: { target: { value: any } }) => {
        setMail(e.target.value)
    }
    const telOnChange = (e: { target: { value: any } }) => {
        setTel(e.target.value)
    }
    const passwordOnChange = (e: { target: { value: any } }) => {
        setPassword(e.target.value)
    }
    return (
        <div className="userlayer">
            <div className="userlayer_main" ref={main}>
                <header className='userlayer_main_header'>
                    <div className="userlayer_main_header_title">{title}</div>
                    <div className="userlayer_main_header_btn" onClick={hide}>x</div>
                </header>
                <div className="userlayer_main_content">
                    {
                        props.type === 'username' &&
                        <div className="userlayer_main_content_username">
                            <input type="text" className='content_input' value={username} onChange={usernameOnChange} />
                        </div>
                    }
                    {
                        props.type === 'email' &&
                        <div className="userlayer_main_content_username">
                            <input type="text" className='content_input' value={username} onChange={usernameOnChange} />
                        </div>
                    }
                    {
                        props.type === 'telephone' &&
                        <>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入手机号'
                                    value={tel}
                                    onChange={telOnChange} />
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入密码'
                                    value={password}
                                    onChange={passwordOnChange} />
                            </div>
                        </>


                    }
                </div>
                <footer className='userlayer_main_footer'>
                    <div className="userlayer_main_footer_cancel userlayer_main_footer_btn" onClick={hide}>取消</div>
                    <div className="userlayer_main_footer_certain userlayer_main_footer_btn">确定</div>
                </footer>
            </div>
            <div className="userlayer_shadow" ref={layer} onClick={hide}></div>
        </div>
    )
}