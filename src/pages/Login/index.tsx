import { Input } from '@/components/molecules/Input'
import { useEffect, useRef, useState } from 'react'
import './index.scss'
export const Login = () => {
    const slide = useRef<any>()
    const passcode = useRef<any>()
    const password = useRef<any>()
    type LoginWay = 'passcode' | 'password'
    type InputType = 'text' | 'password'
    type Status = 'error' | 'normal' | 'correct'
    const [account, setAccount] = useState<string>('');
    const [cipher, setCipher] = useState<string>('');
    const [show, setShow] = useState<boolean>(false)
    const [loginType, setLoginType] = useState<LoginWay>('passcode')
    const [accountMsg, setAccountMsg] = useState<string>('邮箱不能为空')
    const [cipherMsg, setCipherMsg] = useState<string>('')
    const [accountTip, setAccountTip] = useState<string>('请输入邮箱')
    const [cipherTip, setCipherTip] = useState<string>('请输入验证码')
    const [accountStatus, setAccountStatus] = useState<Status>('normal')
    const [cipherStatus, setCipherStatus] = useState<Status>('normal')
    const [inputType, setInputType] = useState<InputType>('text')
    const [remAcount, setRemAcount] = useState<boolean>(false)
    const EmailReg = /^[a-zA-Z0-9][a-zA-Z0-9_]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/
    const telReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    // check is account validate
    useEffect(() => {
        if (loginType === 'passcode') {
            if (EmailReg.test(account)) {
                setAccountStatus('correct')
                setShow(true)
            } else {
                setAccountStatus('error')
                setShow(false)
            }
        } else {
            if (EmailReg.test(account) || telReg.test(account)) {
                setAccountStatus('correct')
                setShow(true)
            } else {
                setAccountStatus('error')
                setShow(false)
            }
        }

    }, [account])

    useEffect(() => {
        validateCipher()
    }, [cipher])

    const validateAccount = () => {
        if (loginType === 'passcode') {
            if (EmailReg.test(account)) {
                setAccountStatus('correct')
            } else if (account.length !== 0) {
                setAccountStatus('error')
                setAccountMsg('邮箱格式不正确')
            }
        } else {
            if (EmailReg.test(account) || telReg.test(account)) {
                setAccountStatus('correct')
            } else if (account.length !== 0) {
                setAccountStatus('error')
                setAccountMsg('账号格式不正确')
            }
        }
    }

    const validateCipher = () => {
        if (loginType === 'passcode') {
            if (cipher.length === 6) {
                setCipherStatus('correct')
            } else {
                setCipherStatus('error')
                setCipherMsg('验证码为6位')
            }

        } else {
            if (cipher.length >= 6 && cipher.length <= 20) {
                setCipherStatus('correct')
            } else {
                setCipherStatus('error')
                setCipherMsg('密码是6-20位的')
            }
        }
    }

    const switchPasscode = () => {
        passcode.current.classList.add('switch_button')
        password.current.classList.remove('switch_button')
        slide.current.style.left = '0%'
        slide.current.style.width = '50%'
        setLoginType('passcode')
        setAccountStatus('normal')
        setCipherStatus('normal')
        setAccountMsg('邮箱不能为空')
        setAccountTip('输入邮箱')
        setCipherTip('输入验证码')
        setInputType('text')
        setAccount('')
        setCipher('')
        setShow(false)
    }
    const switchPassword = () => {
        password.current.classList.add('switch_button')
        passcode.current.classList.remove('switch_button')
        slide.current.style.left = '50%'
        slide.current.style.width = '48%'
        setLoginType('password')
        setAccountStatus('normal')
        setCipherStatus('normal')
        setAccountMsg('账号不能为空')
        setAccountTip('输入手机号或邮箱')
        setCipherTip('输入密码(6-20个字符)')
        setInputType('text')
        setAccount('')
        setCipher('')
        setShow(false)
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
                                validateFun={validateAccount}
                                placeholder={accountTip}
                                input_type='text'
                                status={accountStatus}
                                msg={accountMsg}
                                passcode={false}
                                show={true} />
                            <Input
                                value={cipher}
                                setValue={setCipher}
                                validateFun={validateCipher}
                                placeholder={cipherTip}
                                input_type={inputType}
                                passcode={loginType === 'passcode'}
                                status={cipherStatus}
                                msg={cipherMsg}
                                show={show} />
                            <div className="input-form-remember">
                                <input
                                    type="checkbox"
                                    name="acount"
                                    id="rem"
                                    onChange={() => setRemAcount(!remAcount)}
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