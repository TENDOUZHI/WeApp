import { Link } from 'react-router-dom'
import './index.scss'

export const Home = () => {
    return(
        <div className='home'>
            <div className="home-head">
                <div className="home-head-logo">幻想世界</div>
                <ul className="home-head list-wrapper">
                    <li className="home-head-list">
                        优势所在
                    </li>
                    <li className="home-head-list">
                        帮助中心
                    </li>
                    <li className="home-head-list">
                        关于我们
                    </li>
                </ul>
                <div className="home-head-login">
                    <Link to={'/login'}><button>登录</button></Link>
                </div>
            </div>
        </div>
    )
}