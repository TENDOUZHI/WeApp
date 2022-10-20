import { Device } from '@/components/molecules/Device'
import { Vapp } from '@/store/ast'
import { routesSliceAction, selectCurRoutes, selectVapp, selectWapp } from '@/store/vapp.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { targetSliceAction } from '@/store/target.slice'
import { selectUser } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
import { DownLoad } from '@/components/molecules/DownLoad'
interface Props {
    id: number
}
export const Head = (props: Props) => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const wapp = useSelector(selectWapp)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const [progress, setProgress] = useState<number>(0)
    const [message, setMessage] = useState('');
    const bar = useRef<any>()
    const [title, setTitle] = useState<string>(vapp.project_name)
    const [download, setDownload] = useState<boolean>(false)
    useEffect(() => {

        const data = JSON.parse(localStorage.getItem('vapp') as string) as Vapp
        if (data !== null) {
            setTitle(data.project_name)
        }
        // dispatch(targetSliceAction.initialLayer(layer.current))
    }, [])

    const click = async () => {
        setDownload(true)
        await axios.post('/vapp', wapp, { responseType: 'blob', onDownloadProgress: loadingProgress }).then((res) => {
            const blob = new Blob([res.data], { type: 'application/zip' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const name = wapp.project_name + '.zip'
            link.setAttribute('download', name);
            document.body.appendChild(link);
            setTimeout(() => {
                setDownload(false)
                link.click();
                URL.revokeObjectURL(url) //realease memory
            }, 2000)

        })
    }
    const loadingProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable) {
            setProgress(Math.round((evt.loaded * 100) / evt.total))
        }

    }
    const switchDown = () => {
        setDownload(!download)
    }
    const clear = async () => {
        localStorage.removeItem('vapp')
        localStorage.removeItem('wapp')
        location.reload()
    }
    const selectTitle = () => {
        bar.current.classList.add('show-bar')
    }
    const blurTitle = () => {
        bar.current.classList.remove('show-bar')
        const payload = {
            title: title,
            ws: ws,
            user_id: user.id,
            program_id: props.id
        }
        dispatch(routesSliceAction.updateProjectName(payload))
    }
    const updateTitle = (e: { target: { value: any } }) => {
        setTitle(e.target.value)
    }


    return (
        <>
            <div className="head">
                <div className='head-title'>
                    <input className='head-title-input' type="text"
                        value={title}
                        onChange={updateTitle}
                        onFocus={selectTitle}
                        onBlur={blurTitle} />
                    <div className="bar" ref={bar}></div>
                </div>
                <div className="device">
                    <Device program_id={props.id} />
                </div>
                <div className="etc">
                    <div className='download_btn' onClick={click}>
                        <DownLoad download={download} />
                    </div>
                    <div className='clear' onClick={clear}>clear</div>
                </div>

            </div>
        </>
    )
}