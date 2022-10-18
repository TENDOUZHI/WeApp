import { selectUser } from '@/store/user.slice'
import { useSelector } from 'react-redux'
import './index.scss'
import { useLayoutEffect, useState } from 'react'
import safe from '@/assets/safe.png'
import tip from '@/assets/tip.png'
import { editInfo, UserLayer } from '@/components/molecules/UserLayer'
import { useNavigate } from 'react-router'

export const UserAccount = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [mailBind, setMailBind] = useState<boolean>(user.email !== '' || user.email === null)
    const [telBind, setTelBind] = useState<boolean>(user.telephone !== '' || user.telephone === null)
    const [edit, setEdit] = useState<boolean>(false)
    const [type, setType] = useState<editInfo>('username')
    useLayoutEffect(() => {
        if (user.email) setMailBind(true)
        if (user.telephone) setTelBind(true)
    })
    const back = () => {
        navigate(-1)
    }
    const onChangeName = () => {
        setEdit(true)
    }
    return (
        <div className='userpage'>
            {edit && <UserLayer show={edit} setShow={setEdit} type={type}/>}
            <header className='userpage_header'>
                <div className="userpage_header_back">
                    <button className="userpage_header_back_btn" onClick={back}>返回</button>
                </div>
            </header>
            <div className="userpage_main">
                <div className="userpage_main_content">
                    <div className="userpage_main_content_title">账号设置</div>
                    <div className="userpage_main_content_info">基本信息</div>
                    <div className="userpage_main_content_list">
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">
                                    <div className="userpage_main_content_list_item_left_head_avatar">
                                        <div className="userpage_main_content_list_item_left_head_avatar_img">
                                            <img src={safe} alt="" />
                                        </div>
                                        <div className="userpage_main_content_list_item_left_head_avatar_main">头像</div>
                                    </div>

                                </div>
                                <div className="userpage_main_content_list_item_left_main">支持 2M 以内的 .JPG .PNG 格式</div>
                            </div>
                            <div className="userpage_main_content_list_item_right">修改头像</div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">姓名</div>
                                <div className="userpage_main_content_list_item_left_main">{user.username}</div>
                            </div>
                            <div className="userpage_main_content_list_item_right" onClick={onChangeName}>编辑姓名</div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">邮箱</div>
                                {
                                    mailBind
                                        ? <div className="userpage_main_content_list_item_left_main">{user.email}</div>
                                        : <div className="userpage_main_content_list_item_left_main">未绑定</div>
                                }

                            </div>
                            <div className="userpage_main_content_list_item_right">
                                {
                                    mailBind
                                        ? '解除绑定'
                                        : '立即绑定'
                                }
                            </div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">电话</div>
                                {
                                    telBind
                                        ? <div className="userpage_main_content_list_item_left_main">{user.telephone}</div>
                                        : <div className="userpage_main_content_list_item_left_main">
                                            <img className="userpage_main_content_list_item_left_main_img" src={tip} alt="" />
                                            未绑定</div>
                                }
                            </div>
                            <div className="userpage_main_content_list_item_right">{
                                telBind
                                    ? '解除绑定'
                                    : '立即绑定'
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}