import { useState } from "react";
import C from "./TrainingRecords.module.css"

export function TrainingRecords () {
    const [date, setDate] = useState('')
    const [km, setKm] = useState('')
    const [Record, setRecord] = useState([])

   function onSubmit(e) {
    e.preventDefault();
    if (!date || !km) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }
    const newRecord = { date, km: parseFloat(km) };
    setRecord(prev => {
        const findedValue = prev.some(item => item.date  === newRecord.date)
        let newValue 
        if (findedValue === true) {
            newValue = prev.map((item) => {
                return ({...item, km: item.km + newRecord.km})
            })
        }   else {
            newValue = [...prev, newRecord]
        }
      return newValue.sort((a, b) => new Date(a.date) - new Date(b.date));
    })
    setDate('');
    setKm('');
}

   
    function CheckValueInput (value) {
        if(!/^\d*\.?\d*$/.test(value)) {
            alert ("Доступны только числа!")
            return ""
        }
        if (value.length > 5) {
            return value.slice(0,4)
        }
        return value
    }

   function deleteRecord (indexToDelete) {
    setRecord(prev => prev.filter((_, index)=> index !== indexToDelete))
   }
    
    return (
           <div>
             <form className={C.container} onSubmit={onSubmit}>
                <div className={C.redaction}>
                    <div className={C.dataContainer}>
                        <label htmlFor = "dateInput" className={C.dataLabel}> 
                            Дата (ДД.ММ.ГГ)
                        </label>
                        <input type="date" name= "date" className={C.input} id="dateInput" value={date} onChange={(e)=> setDate(e.target.value)}/>
                    </div>
                     <div className={C.dataContainer}>
                        <label htmlFor = "kiloInput" className={C.dataLabel}> 
                            Пройдено, (км)
                        </label>
                         <input type="text" name= "km" className={C.input} id="kiloInput" value={km} onChange={(e)=> setKm(CheckValueInput(e.target.value))} />
                    </div>
                    <div className={C.dataContainer}>
                        <button className={C.button} type="submit">Отправить</button>
                    </div>
                </div>
            </form>
            <div className={C.records}>
                <div className={C.tags}>
                    <span className={C.tagsSpan}> Дата (ДД.ММ.ГГ)</span>
                    <span className={C.tagsSpan}> Пройдено, (км)</span>
                </div>
              {Record.map ((rec,index)=> (
                <div key={index} className={C.recordsBlock}>
                        <input type="text" readOnly value={rec.date} className={C.recordsInput}/> 
                        <input type="text" readOnly value={rec.km} className={C.recordsInput}/>
                    <button className={C.buttonDelete} onClick={() => {deleteRecord(index)}}>✘</button>
                    </div>
              ))}
            </div>
           </div>
    )
}