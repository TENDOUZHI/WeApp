import { PassCodePayload } from '@/store/ast'
import { selectUser } from '@/store/user.slice'
import axios from 'axios'
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
    const [passcode, setPasscode] = useState<string>('')
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
    const passcodeOnChange = (e: { target: { value: any } }) => {
        setPasscode(e.target.value)
    }
    const sendPasscode = async () => {
        const payload: PassCodePayload = {
            email_address: mail,
            is_login: user.isLogin
        }
        await axios.post('/passcode', payload).then(res => {
            console.log('passcode', res);

        })
    }
    const sendRequest = () => {
        switch (props.type) {
            case 'username':
                updateUsername()
                break;
            case 'email':
                updateMail()
                break;
            case 'telephone':
                updateTel()
                break;
            default:
                break;
        }
    }
    const updateUsername = async () => {
        const payload = {
            user_id: user.id,
            username: username
        }
        await axios.post('/update/username', payload).then(res => {
            console.log(res);
        })
    }
    const updateMail = async () => {
        const payload = {
            user_id: user.id,
            mail,
            passcode,
            password
        }
        await axios.post('/update/mail',payload).then(res => {
            console.log(res);

        })
    }
    const updateTel = async () => {
        const payload = {
            user_id: user.id,
            telephone: tel,
            password
        }
        await axios.post('/update/tel', payload).then(res => {
            console.log(res);

        })
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
                        <>
                            <div className="userlayer_main_content_username">
                                {/* <span className="userlayer_main_content_username_tip">邮箱</span> */}
                                <input type="text" className='content_input'
                                    placeholder='输入邮箱'
                                    value={mail}
                                    onChange={mailOnChange} />
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入验证码'
                                    value={passcode}
                                    onChange={passcodeOnChange} />
                                <div className='passcode_btn' onClick={sendPasscode}>发送验证码</div>
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入密码'
                                    value={password}
                                    onChange={passwordOnChange} />
                            </div>
                        </>
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
                    <div className="userlayer_main_footer_certain userlayer_main_footer_btn" onClick={sendRequest}>确定</div>
                </footer>
            </div>
            <div className="userlayer_shadow" ref={layer} onClick={hide}></div>
        </div>
    )
}