import { Align } from '@/components/molecules/Align'
import { Basicstyle } from '@/components/molecules/Basicstyle'
import { Bgc } from '@/components/molecules/BGC'
import { Border } from '@/components/molecules/Border'
import { Margin } from '@/components/molecules/Margin'
import { Padding } from '@/components/molecules/Padding'
import { selectTarget } from '@/store/target.slice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
export const RighttList = () => {
    let target = useSelector(selectTarget) as HTMLElement
    return(
        <div className="rightlist-wrapper">
            <Basicstyle target={target}/>
            <Margin target={target}/>
            <Padding target={target}/>
            <Border target={target}/>
            <Bgc target={target}/>
            {/* <Align target={target}/> */}
        </div>
    )
}