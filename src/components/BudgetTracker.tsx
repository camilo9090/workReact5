import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import{CircularProgressbar,buildStyles}from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useMemo } from "react";





export default function BudgetTracker() {


    const{state,disponible,gastoTotal,dispatch}=useBudget()
    const percentage=+((gastoTotal/ state.budget)*100).toFixed(2)
    const canRestart=()=>useMemo(()=>state.expense.length>0,[state.expense])
    

  



    return (


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-centter">
                <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor:percentage===100?'#DC2626':'#3b82f6',
                    trailColor:'#F5F5F5',
                    textSize:8,
                    textColor:percentage===100?'#DC2626':'#3b82f6'
                })}
                text={`${percentage}% Gastado`}
                />

            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button className="bg-pink-600 w-full p-2 rounded-lg text-white uppercase font-bold " 
                disabled={!canRestart()}
                onClick={()=>{dispatch({type:'restart-app'})}}>
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={disponible}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={gastoTotal}
                />
            </div>
        </div>
    )
}
