import { useAutoHide } from '@/hooks/useAutoHide'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'

interface Props {
    name: string,
    time: string
}
export const RepItem = (props: Props) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<boolean>(false)
    const item = useRef<any>()
    const etc = useRef<any>()
    const options = useRef<any>()
    const switchOption = useAutoHide(options.current, etc.current, 'rep-show-option')

    useEffect(() => {
        etc.current.click()
    }, [])
    const selectList = (e: MouseEvent) => {
        if (selected &&
            e.target !== etc.current &&
            e.target !== options.current &&
            e.target !== options.current.childNodes[0]
        ) {
            setSelected(false)
            navigate('/workspace', { replace: false, state: { name: 'Vapp' } })
        } else {
            setSelected(true)
            document.addEventListener('click', (event) => {
                if (e.target === event.target) {
                    item.current.classList.add('selected-rep-item')
                } else {
                    item.current.classList.remove('selected-rep-item')
                    setSelected(false)
                }

            })
        }
    }
    return (
        <div className="repitem" onClick={selectList}>
            <div className="repitem-item" ref={item}>
                <div className="repitem-item-name">{props.name}</div>
                <div className="repitem-item-time">{props.time}</div>
                <div className="repitem-item-etc" onClick={() => { switchOption() }} ref={etc}>···</div>
                <ul className="repitem-item-option" ref={options}>
                    {/* <li className="repitem-item-option-li">重命名</li> */}
                    <li className="repitem-item-option-li" onClick={() => switchOption()}>删除</li>
                </ul>
            </div>

        </div>
    )
}