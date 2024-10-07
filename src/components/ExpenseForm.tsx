import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import { DraftExpense } from "../types";
import { useState } from "react";
import 'react-calendar/dist/Calendar.css'
import'react-date-picker/dist/DatePicker.css'


export default function ExpenseForm() {

  const [expense,setexpense]=useState<DraftExpense>({
    amount:0,
    expenseName:'',
    category:'',
    date:new Date()

  })
  return (
    <form className="space-y-5" action="">

      <legend
        className="uppercase text-center text-2xl font-black border-b-4 
      py-2 border-blue-500"
      >Nuevo Gasto</legend>

      <div className="flex flex-col gap-2">

        <label className="text-xl" htmlFor="expenseName">
          Nombre Gasto:
        </label>
        <input
          id="expenseName"
          type="text"
          placeholder="Añade el Nombre del Gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName} />
      </div>
      <div className="flex flex-col gap-2">

        <label className="text-xl" htmlFor="amount">
          Cantidad:
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Añade la cantidad del Gasto ej.300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount} />
      </div>

      <div className="flex flex-col gap-2">

        <label className="text-xl" htmlFor="category">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(cat => (
            <option
              key={cat.id}
              value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">

        <label className="text-xl" htmlFor="amount">
          Faecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
        />
      </div>
      <input type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
      font-bold rounded-lg"
        value={'Registrar Gasto'} />
    </form>
  )
}
