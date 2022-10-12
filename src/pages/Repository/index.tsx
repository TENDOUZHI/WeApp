import { RepItem } from '@/components/molecules/RepItem'
import { Item, repSliceAction, selectList } from '@/store/respository.slice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './index.scss'

export const Repository = () => {
    const dispatch = useDispatch()
    const lists = useSelector(selectList)
    const createItem = () => {
        const item: Item = {
            id: lists.length,
            name: 'Vivid',
            lastDate: '10月1日'
        }
        dispatch(repSliceAction.appendData(item))
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
                    {lists.map(item => <RepItem key={item.id} name={item.name} time={item.lastDate} />)}
                    {/* <RepItem name='Vapp' time='10月11日' />
                    <RepItem name='村口备案' time='9月23日' /> */}
                </div>
            </div>
        </div>
    )
}