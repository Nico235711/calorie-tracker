import { Activity } from "../types"

// acciones quee describen que esta pasando en la app
export type ActivityActions =
  { type: "save-activity", payload: { newActivity: Activity } } |
  { type: "set-activeId", payload: { id: Activity["id"] } } |
  { type: "remove-activity", payload: { id: Activity["id"] } } |
  { type: "restart-app" }

export type ActivityState = {
  activities: Activity[],
  activeId: Activity["id"]
}

// state inicial

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities")
  return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: ""
}

// nuestro reducer
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  switch (action.type) {
    case "save-activity":
      let updatedActivities: Activity[] = []
      // este código maneja la lógica para actualizar el state
      if (state.activeId) { // editando registro
        updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)

      } else { // nuevo registro
        updatedActivities = [...state.activities, action.payload.newActivity]

      }
      // retorno del estado acualizado      
      return {
        ...state,
        activities: updatedActivities,
        activeId: ""
      }
    case "set-activeId":
      return {
        ...state,
        activeId: action.payload.id
      }
    case "remove-activity":
      // retorno del estado actualizado
      return {
        ...state,
        activities: state.activities.filter(stateActivity => stateActivity.id !== action.payload.id),
        activeId: ""
      }
    case "restart-app":

      return {
        activities: [],
        activeId: ""
      }
    default:
      return state
    }
}