import { Activity } from "../types"
import { REMOVE_ACTIVITY, RESTART_APP, SET_ACTIVE_ID, SAVE_ACTIVITY } from './actions'

// acciones quee describen que esta pasando en la app
export type ActivityActions =
  | { type: typeof SAVE_ACTIVITY, payload: { newActivity: Activity } } 
  | { type: typeof SET_ACTIVE_ID, payload: { id: Activity["id"] } } 
  | { type: typeof REMOVE_ACTIVITY, payload: { id: Activity["id"] } } 
  | { type: typeof RESTART_APP }
  
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
    case "SAVE_ACTIVITY":
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
    case "SET_ACTIVE_ID":
      return {
        ...state,
        activeId: action.payload.id
      }
    case "REMOVE_ACTIVITY":
      // retorno del estado actualizado
      return {
        ...state,
        activities: state.activities.filter(stateActivity => stateActivity.id !== action.payload.id),
        activeId: ""
      }
    case "RESTART_APP":

      return {
        activities: [],
        activeId: ""
      }
    default:
      return state
    }
}