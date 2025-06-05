import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
export default function CalorieTracker({ activities }: CalorieTrackerProps) {

  const consumedCalories = useMemo(() => activities.reduce((accu, activity) => activity.category === 1 ? accu + activity.calories : accu, 0), [activities])
  const burnedCalories = useMemo(() => activities.reduce((accu, activity) => activity.category === 2 ? accu + activity.calories : accu, 0), [activities])
  const diffCalories = consumedCalories - burnedCalories
  return (
    <>
      <h2 className="text-2xl uppercase font-black text-center text-white">Resumen de Calorías</h2>
      <div className="flex flex-col gap-5 items-center md:flex-row md: justify-between">
        <CalorieDisplay
          text="consumidas"
          calories={consumedCalories} 
        />
        <CalorieDisplay
          text="Quemadas"
          calories={burnedCalories} 
        />
        <CalorieDisplay
          text="Diferencia"
          calories={diffCalories} 
        />
      </div>
    </>
  )
}
