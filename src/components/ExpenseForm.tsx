import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import { DraftExpense, Value } from "../types";
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

  const [expense, setexpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()

  }
)
  
  const handleChangedate = (value: Value) => {
    setexpense(
      {
        ...expense,
        date: value
      }

    )
  }

  //agregar o actualizar gasto
  const [error, seterror] = useState('')
  const { dispatch, state,disponible,gastoTotal } = useBudget()
  const[previousAmount,setpreviousAmoun]=useState(0)
  useEffect(() => {

    if (state.editingId) {
      const editingExpense = state.expense.filter(salida => salida.id === state.editingId)[0]
      setexpense(editingExpense)
      setpreviousAmoun(editingExpense.amount)
    }

  }, [state.editingId])



  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

    const { name, value } = e.target
    const isAmount = ['amount'].includes(name)


    setexpense({
      ...expense,
      [name]: isAmount ? +value : value
    })


  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    //validar

    if (Object.values(expense).includes('')) {
      seterror('Todos los campos son obligatorios')
      return

    }
   //validar que no me pase del limite
    if ((expense.amount-previousAmount)>disponible) {
      seterror('Ese gasto se sale del presupuesto')
      return

    }

    //reiniciar state
    setexpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
      
    })
    setpreviousAmoun(0)
  

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })

    } else {
      //agregar nuevo gasto
      dispatch({ type: 'add-expense', payload: { expense } })
    }
  }

  return (
    <form className="space-y-5" action="" onSubmit={handleSubmit} >


      <legend
        className="uppercase text-center text-2xl font-black border-b-4 
      py-2 border-blue-500"
      >{state.editingId ? 'Guardar Cambios' : 'Nueva Gasto'}</legend>

      {error && <ErrorMessage>
        {error}
      </ErrorMessage>}
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
          value={expense.expenseName}
          onChange={handleChange} />
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
          value={expense.amount}
          onChange={handleChange} />
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
          onChange={handleChange}
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
          onChange={handleChangedate}

        />
      </div>
      <input type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
        font-bold rounded-lg"
        value={state.editingId ? 'Registrar Cambios' : 'Registrar Gasto'} />
    </form>
  )
}
