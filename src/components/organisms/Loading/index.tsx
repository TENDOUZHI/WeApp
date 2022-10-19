import { useLayoutEffect, useRef, useState } from 'react'
import './index.scss'

interface Props {
    loading: boolean
    title?: string
}

export const Loading = (props: Props) => {
    const circle = useRef<any>()
    const svg = useRef<any>()
    const loading = useRef<any>()
    const [long, setLong] = useState<boolean>(true)
    const [unnount, setUnmount] = useState<boolean>(false)
    useLayoutEffect(() => {
        if (!props.loading) {
            try {
                loading.current.classList.add('loading_fade')
            } catch (error) { }

            setTimeout(() => {
                setUnmount(true)
            }, 500)
        }
        const timer = setInterval(() => {
            if (long) {
                circle.current.classList.add('dot')
                circle.current.classList.remove('long')
                setLong(() => false)
            } else {
                circle.current.classList.add('long')
                circle.current.classList.remove('dot')
                setLong(() => true)
            }
        }, 1500)
        return (() => {
            clearInterval(timer)
        })
    })
    return (
        <>
            {
                !unnount &&
                < div className="loading" ref={loading}>
                    {
                        props.title &&
                        <div className="loading_title">{props.title}</div>
                    }
                    <div className="loading_content" >
                        <svg className='svg svg_rotate' ref={svg} height='100%' width='100%'>
                            <linearGradient id="gradient">
                                <stop offset="0" stop-color="#fe7970" />
                                <stop offset="25%" stop-color="#ff5c80" />
                                <stop offset="50%" stop-color="#fead67" />
                                <stop offset="75%" stop-color="#fccd64" />
                                <stop offset="100%" stop-color="#f99a7f" />
                            </linearGradient>
                            <circle className='svg_item long' stroke='url(#gradient)' ref={circle} cx='50%' cy='50%' r='40'></circle>

                        </svg>
                    </div >
                </div >
            }
        </>
    )
}