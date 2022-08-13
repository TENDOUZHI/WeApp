import { selectTarget } from "@/store/target.slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"


export const useGetValue = (prop: string): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const dispatch = useDispatch()
    useEffect(() => {
        if (target !== null) {
            const newValue = getComputedStyle(target).getPropertyValue(prop)
            setValue(newValue)
        }
    },[target])
    // transfer to camel name

    const setValues = (value: string) => {
        let camel: string | any = ''
        if (target !== null) {
            if (prop.includes('-')) {
                for (let i = 0; i < prop.length; i++) {
                    if (prop[i] === '-') {
                        camel = prop.substring(0, i) + prop[i + 1].toUpperCase() + prop.substring(i + 2, prop.length)
                    }
                }
            } else {
                camel = prop
            }
            target.style[camel] = value
        }

    }

    return [value, setValues];
}
