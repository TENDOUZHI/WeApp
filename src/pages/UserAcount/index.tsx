import { selectUser } from '@/store/user.slice'
import { useSelector } from 'react-redux'
import './index.scss'

export const UserAccount = () => {
    const user = useSelector(selectUser)
    return(
        <div className='userpage'>
            <header className='userpage_header'>
                <div className="userpage_header_back">
                    <button className="userpage_header_back_btn">返回</button>
                </div>
            </header>
            <div className="userpage_main">
                <div className="userpage_main_content">
                    <div className="userpage_main_content_title">账号设置</div>
                    <div className="userpage_main_content_info">基本信息</div>
                    <div className="userpage_main_content_list">
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">姓名</div>
                                <div className="userpage_main_content_list_item_left_main">{user.username}</div>
                            </div>
                            <div className="userpage_main_content_list_item_right">编辑姓名</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}