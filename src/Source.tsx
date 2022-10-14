import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Repository } from './pages/Repository'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { User, userSliceAction } from './store/user.slice'
export const Source = () => {
    const dispatch = useDispatch()
    const verifyUser = () => {
        const user = JSON.parse(localStorage.getItem('user') as string)
        const payload = {
            id: user.id,
            username: user.username,
            token: user.token
        }
        axios.post('/login/verify', payload).then(res => {
            if (res.status === 200) {
                const { data } = res
                const userInfo: User = {
                    id: data.id,
                    username: data.username,
                    avatar: data.avatar,
                    email: data.email,
                    telephone: data.telephone,
                    token: data.token,
                    isLogin: true
                }
                dispatch(userSliceAction.synUserData(userInfo))
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        })
    }
    useEffect(() => {
        verifyUser()
    }, [])
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/repository' element={<Repository />}></Route>
                <Route path='/workspace' element={<WorkSpace />}></Route>
            </Routes>
        </Router>
    )
}