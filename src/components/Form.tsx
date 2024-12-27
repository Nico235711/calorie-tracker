import { Dispatch } from "react"

import { categories } from "../data/categories"
import { ActivityActions, ActivityState, } from "../reducers/activity-reducer"
import { useForm } from "../hooks/useForm"

type FormProps = {
  state: ActivityState
  dispatch: Dispatch<ActivityActions>
}

const Form = ({ state, dispatch }: FormProps) => {

  const { activity, handleChange, isValidActivity, handleSubmit } = useForm(state, dispatch)

  return (
    <form
      className="p-10 space-y-5 bg-white rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          name="category"
          id="category"
          className="p-2 border-2 rounded-lg border-slate-200"
          value={activity.category}
          onChange={handleChange}
        >
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          type="text"
          name="activity"
          id="name"
          className="p-2 border-2 rounded-lg border-slate-200"
          placeholder="Ej: manzana, jugo de naranja, ensaldada, bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorías:</label>
        <input
          type="text"
          name="calories"
          id="calories"
          className="p-2 border-2 rounded-lg border-slate-200"
          placeholder="Ej: 350 o 500 calorías"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        className="w-full py-2 text-lg font-bold text-white uppercase bg-gray-800 rounded-lg cursor-pointer disabled:opacity-10"
        disabled={!isValidActivity()}
      />
    </form>
  )
}

export default Form