import { Align } from '@/components/molecules/Align'
import { Basicstyle } from '@/components/molecules/Basicstyle'
import { Bgc } from '@/components/molecules/BGC'
import { Border } from '@/components/molecules/Border'
import { Display } from '@/components/molecules/Display'
import { Margin } from '@/components/molecules/Margin'
import { Padding } from '@/components/molecules/Padding'
import { selectTarget } from '@/store/target.slice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
export const RighttList = () => {
    let target = useSelector(selectTarget) as HTMLElement
    // const [status, setStatus] = useState<string>('')
    // if (target !== null) {
    //     setStatus(getComputedStyle(target).getPropertyValue('display'))
    // }
    // console.log(status);
    


    return (
        <div className="rightlist-wrapper">
            <Basicstyle target={target} />
            <Margin target={target} />
            <Padding target={target} />
            <Border target={target} />
            <Bgc target={target} />
            <Display target={target} />
        </div>
    )
}