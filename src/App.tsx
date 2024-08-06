import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  // Almacenando las actividades en LocalStorage
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities]);

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 md:px-5 lg:p-0">
          <h1 className="text-center font-bold text-3xl uppercase text-white">Contador de Calorias</h1>

          <button
            className="bg-gray-800 p-3 text-white rounded-lg text-lg hover:bg-gray-900 transition-all disabled:opacity-40 cursor-pointer uppercase"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Resetear App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-3">
        <div className="max-w-4xl mx-auto">
          <Form 
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </> 
  )
}

export default App
