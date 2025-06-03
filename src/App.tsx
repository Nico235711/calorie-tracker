import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-emerald-700 py-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-4xl font-bold text-center text-white">Contador de Calorías</h1>
        </div>
      </header>
      <section className="bg-emerald-600 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} />
        </div>
      </section>
      <section className="max-w-4xl mx-auto p-5">
        <ActivityList activities={state.activities} />
      </section>
    </>
  )
}
