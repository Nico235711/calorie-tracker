import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesResume from "./CaloriesResume"

type CalorieTrackerProps = {
  activities: Activity[]
}

const CalorieTracker = ({ activities } : CalorieTrackerProps) => {

  // contadores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
  const diffCalories = caloriesConsumed - caloriesBurned

  return (
    <>
      <h2 className="text-center md:ml-[60px] text-white text-3xl font-black">Resumen de Calorías</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-around mt-4">
        <CaloriesResume 
          calories={caloriesConsumed}
          text="Calorías Consumidas"
        />
        <CaloriesResume 
          calories={caloriesBurned}
          text="Calorías Quemadas"
        />
        <CaloriesResume 
          calories={diffCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
}

export default CalorieTracker