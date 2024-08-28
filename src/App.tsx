import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])
  
  // Almacenando las actividades en LocalStorage
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities]);

  return (
    <>
      <header className="py-5 bg-lime-600">
        <div className="flex flex-col items-center justify-between max-w-4xl gap-5 mx-auto md:flex-row md:px-5 lg:p-0">
          <h1 className="text-3xl font-bold text-center text-white uppercase">Contador de Calorias</h1>

          <button
            className="p-3 text-lg text-white uppercase transition-all bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900 disabled:opacity-40"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Resetear App
          </button>
        </div>
      </header>

      <section className="px-3 py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form 
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="py-10 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </> 
  )
}

export default App
