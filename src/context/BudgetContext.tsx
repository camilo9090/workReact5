
import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    gastoTotal:number
    disponible:number

}

type BudgetProviderProps = {

    children:ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetProvider = ({ children }:BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    
    const gastoTotal=useMemo(()=>state.expense.reduce((salida,expense)=>expense.amount+salida,0),[state.expense])    
    const disponible=state.budget-gastoTotal

    return (

        <BudgetContext.Provider
        
        value={{
            state,
            dispatch,
            gastoTotal,
            disponible
        }}
        >

            {children}
        </BudgetContext.Provider>
    )
}

