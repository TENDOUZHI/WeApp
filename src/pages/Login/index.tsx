import { Input } from '@/components/molecules/Input'
import { Card } from '@/components/organisms/Card'
import { useEffect, useRef, useState } from 'react'
import './index.scss'
export const Login = () => {
    return (
        <div className="login">
            <div className="login-left"></div>
            <div className="login-right">
                <Card/>
            </div>
        </div>
    )
}