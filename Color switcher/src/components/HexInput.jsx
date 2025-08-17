import { useState } from "react";
import C from './HexInput.module.css'
export function HexInput () {
const [value,setValue] = useState("")
const [valueColor, setValueColor] = useState(null)

return (
          <div className={C.container} style={{backgroundColor: valueColor}} > 
            <label htmlFor="label"> 
                <input type="text" name="input" value={value} onChange={(e) => {
                   setValue(e.target.value)
                   if (e.target.value.length === 7) {
                    const hexColor = /#([a-f0-9]{6}|[a-f0-9]{3})\b/gi;
                    const trueValueColor = e.target.value.match(hexColor)
                    if (trueValueColor) {
                      setValueColor(trueValueColor)
                    } if(!trueValueColor){
                      setValueColor("Ошибка, неправильный HEX")
                    }
                   } else {
                      setValueColor(null)
                    }
                }}/>
            </label>
            <div className={C.value} >{valueColor}</div>
        </div>

    )
}
    