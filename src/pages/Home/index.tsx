import { useScroll } from '@/hooks/useScroll'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import buildPage from '@/assets/build page.png'
import autoSave from '@/assets/auto save.png'
import codeSet from '@/assets/code set.png'
import dataSafe from '@/assets/data safe.png'

export const Home = () => {
    const slide = useRef<any>()
    const slide2 = useRef<any>()
    const slide3 = useRef<any>()
    const slide4 = useRef<any>()
    const title = useRef<any>()
    const board = useRef<any>()
    const container = useRef<any>()
    const ob = useRef<any>()
    const monitorScroll = () => {
        const scrollTop = Math.round(container.current.scrollTop)
        const target = 1000
        const rate = target / 500
        if (scrollTop >= 300) {
            title.current.style.height = 0
            board.current.style.transform = 'translateY(10%)'
        } else {
            title.current.style.height = '3rem'
            board.current.style.transform = 'translateY(30%)'
        }
        // controll slide1
        if (scrollTop >= 0 && scrollTop <= 1000) {
            slide.current.style.left = scrollTop - 1000 + 'px'
            slide.current.style.top = scrollTop - 1000 + 'px'
        } else if (scrollTop > 1000) {
            slide.current.style.left = 0 + 'px'
            slide.current.style.top = 0 + 'px'
        }
        // controll slide2
        if (scrollTop >= 100 && scrollTop <= 1100) {
            slide2.current.style.right = scrollTop - 1100 + 'px'
            slide2.current.style.top = scrollTop - 1100 + 'px'
        } else if (scrollTop > 1100) {
            slide2.current.style.right = 0 + 'px'
            slide2.current.style.top = 0 + 'px'
        }
        // controll slide3
        if (scrollTop >= 200 && scrollTop <= 1200) {
            slide3.current.style.left = scrollTop - 1200 + 'px'
            slide3.current.style.bottom = scrollTop - 1200 + 'px'
        } else if (scrollTop > 1200) {
            slide3.current.style.left = 0 + 'px'
            slide3.current.style.bottom = 0 + 'px'
        }
        // controll slide4
        if (scrollTop >= 300 && scrollTop <= 1300) {
            slide4.current.style.right = scrollTop - 1300 + 'px'
            slide4.current.style.bottom = scrollTop - 1300 + 'px'
        } else if (scrollTop > 1300) {
            slide4.current.style.right = 0 + 'px'
            slide4.current.style.bottom = 0 + 'px'
        }
    }
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((v, i) => {
            if (v.isIntersecting) {
                if (v.target === slide.current ||
                    v.target == slide2.current ||
                    v.target == slide3.current ||
                    v.target == slide4.current
                ) {
                    setTimeout(() => {
                        v.target.classList.add('cansee')
                    },100)
                } else {
                    v.target.classList.add('cansee')
                }
                
            } else {
                v.target.classList.remove('cansee')
            }
        })
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    useLayoutEffect(() => {
        io.observe(board.current)
        io.observe(slide.current)
        io.observe(slide2.current)
        io.observe(slide3.current)
        io.observe(slide4.current)
    }, [])

    return (
        <div className='homepage' onScroll={monitorScroll} ref={container}>
            <div className="homepage-head">
                <div className="homepage-head-logo">幻想世界</div>
                <ul className="homepage-head list-wrapper">
                    <li className="homepage-head-list">
                        优势所在
                    </li>
                    <li className="homepage-head-list">
                        帮助中心
                    </li>
                    <li className="homepage-head-list">
                        关于我们
                    </li>
                </ul>
                <div className="homepage-head-login">
                    <Link to={'/login'}><button>登录</button></Link>
                </div>
            </div>
            <div className="homepage-content">
                <div className="sticky">
                    <div className="sticky-wrapper1">
                        <div className="sticky-wrapper1-main">
                            <div className="sticky-wrapper1-main-title" ref={title}>
                                <p>自由创作,结构整洁</p>
                            </div>
                            <div className="wrapper1-center" ref={board}>
                                <div className="wrapper1-center-slide1 wrapper1-center-slide" ref={slide}>
                                    <div className="wrapper1-center-slide-title">随搭建页面</div>
                                    <div className="wrapper1-center-slide-img">
                                        <img src={buildPage} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide2 wrapper1-center-slide" ref={slide2}>
                                    <div className="wrapper1-center-slide-title">实时保存页面信息</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={autoSave} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide3 wrapper1-center-slide" ref={slide3}>
                                    <div className="wrapper1-center-slide-title">整洁的代码结构</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={codeSet} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide4 wrapper1-center-slide" ref={slide4}>
                                    <div className="wrapper1-center-slide-title">数据安全</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={dataSafe} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="sticky-wrapper2">
                        {/* <div className="sticky-wrapper2-main">
                            <div className="sticky-wrapper2-main-ob" ref={ob}>hello</div>
                            <div className="sticky-wrapper2-main-slide" ref={slide2}></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}