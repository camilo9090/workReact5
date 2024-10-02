
import { useContext } from "react"
import { BudgetContext } from "../contect/BudgetContext"
export const useBudget=()=>{
const context=useContext(BudgetContext)

if (!context) {
    throw new Error('No hay provider')
}
return context
}