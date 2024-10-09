import { categories } from "../data/categories"
import { formantDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from 'react'



type ExpenseDetailsProps = {

  expense: Expense
}
export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {

  const categotyInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
  return (

    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex items-center gap-5 ">
      <div>
        <img src={`/icono_${categotyInfo.icon}.svg`}
          alt="icono gasto"
          className="w-20" />
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-sm font-bold uppercase text-slate-500">{categotyInfo.name}</p>
        <p>{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">{formantDate(expense.date!.toString())}</p>
      </div>
      <AmountDisplay
        amount={expense.amount}
      />

    </div>
  )
}
