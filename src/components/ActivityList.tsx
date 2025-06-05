import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid"
import type { Activity } from "../types"
import { useMemo, type Dispatch } from "react"
import type { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
  activities: Activity[]
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

  const isEmpty = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-3xl uppercase font-black text-center">Resumen</h2>
      {
        isEmpty ? (
          <p className="text-center text-lg mt-5">No hay actividades registradas...</p>
        ) : (
          <>
            {
              activities.map(activity => (
                <div
                  className="flex justify-between py-10 px-5 bg-white shadow items-center mb-5 last-of-type:mb-0"
                  key={activity.id}
                >
                  <div
                    className="space-y-3 relative"
                  >
                    <p
                      className={`${activity.category === 1 ? "bg-emerald-500" : "bg-amber-500"} px-5 py-1 absolute -top-8 -left-8 text-white font-semibold text-lg`}
                    >{activity.category === 1 ? "Comida" : "Ejercicio"}</p>
                    <p className="text-lg mt-5">{activity.name}</p>
                    <p className={`${activity.category === 1 ? "text-emerald-500" : "text-amber-500"} text-lg font-bold`}>{activity.calories} Calorías</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "set-activeId", payload: { id: activity.id } })}
                    >
                      <PencilIcon className="size-8 cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                    >
                      <TrashIcon className="size-8 cursor-pointer text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            }
          </>
        )
      }
    </>
  )
}
