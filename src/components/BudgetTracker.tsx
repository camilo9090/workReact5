import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";




export default function BudgetTracker() {


    const{state,disponible,gastoTotal}=useBudget()

  



    return (


        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-centter">
                <img src="/grafico.jpg" alt="Grafica de gastos" />

            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button className="bg-pink-600 w-full p-2 rounded-lg text-white uppercase font-bold ">
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
