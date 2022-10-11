import { Input } from '@/components/molecules/Input'
import { Card } from '@/components/organisms/Card'
import { useEffect, useRef, useState } from 'react'
import './index.scss'
export const Login = () => {
    return (
        <div className="login">
            <div className="login-left">
                <div className="login-left-logo">
                    幻想世界
                </div>
                <div className="login-left-main">
                    <div className="login-left-main-title">
                        <p className="login-left-main-title-text">欢迎来到幻想世界开发平台😀</p>
                        <p className="login-left-main-title-text">快速的构建微信小程序🚀</p>
                        <p className="login-left-main-title-tip">✅免费 ✅永久开源 ✅设计/开发/底代码</p>
                    </div>
                </div>
            </div>
            <div className="login-right">
                <Card />
            </div>
        </div>
    )
}