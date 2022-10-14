import { RepItem } from '@/components/molecules/RepItem'
import { Item, ProgramDelete, ProgramInsert, repSliceAction, selectList } from '@/store/respository.slice'
import { selectUser } from '@/store/user.slice'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './index.scss'

export const Repository = () => {
    const dispatch = useDispatch()
    const lists = useSelector(selectList)
    const user = useSelector(selectUser)
    useEffect(() => {
        selectProgram()
        // console.log(user);
    }, [])
    const selectProgram = async () => {
        await axios.get('/programlist').then((res) => {
            const { data } = res
            dispatch(repSliceAction.synListData(data.list))
        })
    }
    const createItem = async () => {
        const date = new Date().toLocaleDateString().replaceAll('/', '-')
        const payload: ProgramInsert = {
            user_id: user.id,
            name: 'New File',
            lastdate: date
        }
        await axios.post('/programlist/insert', payload).then((res) => {
            if (res.status === 200) {
                selectProgram()
            }
        })
    }
    const deleteItem = async (id: number) => {
        const payload: ProgramDelete = {
            id: id,
            user_id: user.id
        }
        await axios.post('/programlist/delete',payload).then((res) => {
            if(res.status===200) {
                selectProgram()
            }
        })
    }
    
    return (
        <div className="rep">
            <div className="rep-file">
                <div className="rep-file-title">文件列表</div>
                <div className="rep-file-operate">
                    <div className="rep-file-operate-fun" onClick={createItem}>
                        创建文件+
                    </div>
                </div>
                <div className="rep-file-ul">
                    <div className="rep-file-ul-head">
                        <div className="rep-file-ul-head-name">名称</div>
                        <div className="rep-file-ul-head-time">更新时间</div>
                    </div>
                    {lists.map(item => <RepItem key={item.id} id={item.id} name={item.name} time={item.lastdate} deleteFun={deleteItem} />)}
                    {/* <RepItem name='Vapp' time='10月11日' />
                    <RepItem name='村口备案' time='9月23日' /> */}
                </div>
            </div>
        </div>
    )
}