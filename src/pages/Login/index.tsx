import { Input } from '@/components/molecules/Input'
import { useEffect, useRef, useState } from 'react'
import './index.scss'
export const Login = () => {
    const slide = useRef<any>()
    const passcode = useRef<any>()
    const password = useRef<any>()
    const [account, setAccount] = useState<string>('');
    const [cipher, setCipher] = useState<string>('');
    const [show, setShow] = useState<boolean>(false)
    const [accountVali, setAccountVali] = useState<boolean>(false)
    const [cipherVali, setCipherVali] = useState<boolean>(false)
    const [remAcount, setRemAcount] = useState<boolean>(false)
    useEffect(() => {
        if (account.length === 11) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [account, cipher])

    const switchPasscode = () => {
        passcode.current.classList.add('switch_button')
        password.current.classList.remove('switch_button')
        slide.current.style.left = '0%'
        slide.current.style.width = '50%'
    }
    const switchPassword = () => {
        password.current.classList.add('switch_button')
        passcode.current.classList.remove('switch_button')
        slide.current.style.left = '50%'
        slide.current.style.width = '48%'
    }
    return (
        <div className="login">
            <div className="login-left"></div>
            <div className="login-right">
                <div className="login-right-card">
                    <div className="login-right-card-title">
                        <span className="login-right-card-title-main">登录您的账户</span>
                        <div className="login-right-card-title-sub">
                            <span className="login-right-card-title-sub-tip">没有账号？</span>
                            <span className="login-right-card-title-sub-link">立即注册</span>
                        </div>
                    </div>
                    <div className="login-right-card-input">
                        <div className="input-switch">
                            <span className="input-switch-passcode " ref={passcode} onClick={switchPasscode}>邮箱验证码登录</span>
                            <span className="input-switch-password" ref={password} onClick={switchPassword}>账号密码登录</span>
                            <div className="input-switch-slide" ref={slide}></div>
                        </div>
                        <div className="input-form">
                            <Input
                                value={account}
                                setValue={setAccount}
                                placeholder='请输入邮箱'
                                input_type='email'
                                passcode={false}
                                error={false}
                                show={true} />
                            <Input
                                value={cipher}
                                setValue={setCipher}
                                placeholder='请输入密码'
                                input_type='password'
                                passcode={false}
                                error={false}
                                show={show} />
                            <div className="input-form-remember">
                                <input
                                    type="checkbox"
                                    name="acount"
                                    id="rem"
                                    onClick={() => setRemAcount(!remAcount)}
                                    checked={remAcount} />
                                <label htmlFor="rem">记住账号</label>
                            </div>
                            <div className="input-form-submit">
                                登录
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}