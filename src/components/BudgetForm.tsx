
import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch}=useBudget()
    const isValid = useMemo(() => {

        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();
        dispatch({type:'add-budget',payload:{budget}})
       
        
    }
    return (
        <form className='space-y-5' onSubmit={handleSubmit}>

            <div className='flex flex-col space-y-5'>
                <label htmlFor="budget" className="text-4xl text-blue-500 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number" className="w-full bg-white border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-500 hover:bg-blue-700 p-2 cursor-pointer w-full text-white font-black uppercase disabled:bg-opacity-40"
                disabled={isValid}
            />
        </form>
    )
}