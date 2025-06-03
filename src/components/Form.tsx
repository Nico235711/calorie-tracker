import { useState, type ChangeEvent } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";

const initialActivity = {
  category: 1,
  name: "",
  calories: 0
}

export default function Form() {
  const [activity, setActivity] = useState<Activity>(initialActivity);
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ["category", "calories"].includes(e.target.name)
      setActivity({
        ...activity,
        [e.target.name]: isNumberField ? Number(e.target.value) : e.target.value
      })
  }

  const handleSumbit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(activity).includes("")) {
      
    }
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== "" && calories > 0
  }

  return (
    <form className="space-y-5 bg-white shadow rounded-lg p-10">
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="category"
          className="font-bold text-gray-800 text-lg"
        >Categoría:</label>
        <select
          name="category"
          id="category"
          className="border-2 border-gray-300 w-full p-2 rounded"
          value={activity.category}
          onChange={handleChange}
        >
          {
            categories.map(category => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="name"
          className="font-bold text-gray-800 text-lg"
        >Actividad:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-2 border-gray-300 w-full p-2 rounded"
          placeholder="Ej: pesas, caminar, comer..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="calories"
          className="font-bold text-gray-800 text-lg"
        >Calorías:</label>
        <input
          type="number"
          name="calories"
          id="calories"
          className="border-2 border-gray-300 w-full p-2 rounded"
          placeholder="Ej: 800"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Guardar comida o Guardar ejercicio"
        className="bg-gray-800 w-full text-white text-lg py-3 capitalize font-semibold hover:bg-gray-900 transition-all"
      />
    </form>
  )
}
