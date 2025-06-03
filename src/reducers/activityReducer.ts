import type { Activity } from "../types"

// acciones
export type ActivityActions = 
  | { type: "save-activity", payload: { newActivity: Activity } }

type ActivityState = {
  activities: Activity[]
}

// state
export const initialState: ActivityState = {
  activities: []
}

// reducer

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
  if (action.type === "save-activity") {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity]
    }
  }
  
  return state
}