import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities]);

  const canReset = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-emerald-700 py-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-4xl font-bold text-center text-white">Contador de Calorías</h1>
          <button
            type="button"
            className="px-5 py-1 bg-gray-800 text-white text-lg disabled:opacity-20 cursor-pointer"
            disabled={!canReset}
            onClick={() => dispatch({ type: "reset-app" })}
          >Reiniciar App</button>
        </div>
      </header>
      <section className="bg-emerald-600 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch} 
            state={state}
          />
        </div>
      </section>
      <section className="bg-gray-800 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities}  />
        </div>
      </section>
      <section className="max-w-4xl mx-auto p-5 my-5">
        <ActivityList
          activities={state.activities} 
          dispatch={dispatch}
        />
      </section>
    </>
  )
}
