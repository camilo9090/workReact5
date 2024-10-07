import { categories } from "../data/caategories";


export default function ExpenseForm() {
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
          name="expenseName" />
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
          name="amount" />
      </div>

      <div className="flex flex-col gap-2">

        <label className="text-xl" htmlFor="category">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
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
      <input type="submit"
      className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
      font-bold rounded-lg"
      value={'Registrar Gasto'} />
    </form>
  )
}
