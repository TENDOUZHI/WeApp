import './index.scss'

export const Repository = () => {
    return(
        <div className="rep">
            <div className="rep-file">
                <div className="rep-file-title">文件列表</div>
                <div className="rep-file-operate">
                    <div className="rep-file-operate-fun">
                        创建文件+
                    </div>
                </div>
                <div className="rep-file-ul">
                    <div className="rep-file-ul-head">
                        <div className="rep-file-ul-head-name">名称</div>
                        <div className="rep-file-ul-head-time">更新时间</div>
                    </div>
                    <div className="rep-file-ul-item">
                        <div className="rep-file-ul-item-name">Vapp</div>
                        <div className="rep-file-ul-item-time">10月11日</div>
                        <div className="rep-file-ul-item-etc">···</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}