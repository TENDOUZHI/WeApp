import { StyleInput } from '@/components/atoms/StyleInput'
import { useGetValue } from '@/hooks/useGetValue'
import { useEffect, useState } from 'react'
import './index.scss'

interface Props {
    target: HTMLElement
}
export const Display = (props: Props) => {
    const target = props.target
    const [status, setStatus] = useState<string>('')
    const [display, setDisplay] = useGetValue('display')
    const [flexDirection, setFlexDirection] = useGetValue('flex-direction')
    const [justifyContent, setJustiContent] = useGetValue('justify-content')
    const [justifyItems, setJustifyItems] = useGetValue('justify-items')
    const [alignItems, setAlignItems] = useGetValue('align-items')
    const [alignContent, setAlignContent] = useGetValue('align-content')
    const updateDis = (value: string) => {
        console.log(display);
        setStatus(value)
    }
    useEffect(() => {
        if (target !== null) {
            setStatus(getComputedStyle(target).getPropertyValue('display'))
        }
    })


    return (
        <div className="attribute">
            <div className='attribute-title'>放置</div>
            <div className="attribute-content">
                <StyleInput tip='display' title='Ds' value={display} changeValue={setDisplay} ifValue={updateDis} />
                {
                    status === 'flex' &&
                    <>
                        <StyleInput tip='弹性方向' title='JC' value={flexDirection} changeValue={setFlexDirection} />
                        <StyleInput tip='横向内容' title='JC' value={justifyContent} changeValue={setJustiContent} />
                        <StyleInput tip='横向单位' title='JI' value={justifyItems} changeValue={setJustifyItems} />
                        <StyleInput tip='纵向单位' title='AI' value={alignItems} changeValue={setAlignItems} />
                        <StyleInput tip='纵向内容' title='AC' value={alignContent} changeValue={setAlignContent} />
                    </>
                }
            </div>
        </div>
    )
}