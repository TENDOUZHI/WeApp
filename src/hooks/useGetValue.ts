import { useEffect, useState } from "react"


export const useGetValue = (target: HTMLElement, prop: string): [string, (value: string) => void] => {


    const [value, setValue] = useState<string>('')
    useEffect(() => {
        if (target !== null) {
            const newValue = getComputedStyle(target).getPropertyValue(prop)
            // setValue(newValue.substring(0, newValue.length - 2))
            setValue(newValue)
        }
    }, [target])
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