import { Dispatch } from "react"
import { ActivityActions } from "../reducers/activity-reducer"
import { Activity } from "../types"
import { REMOVE_ACTIVITY, RESTART_APP, SET_ACTIVE_ID } from "../reducers/actions"

export const useActivityActions = (dispatch: Dispatch<ActivityActions>) => {

  const restarApp = () => dispatch({ type: RESTART_APP })
  const setActiveId = (activityId: Activity["id"]) => dispatch({ type: SET_ACTIVE_ID, payload: { id: activityId }})
  const removeActivity = (activityId: Activity["id"]) => dispatch({ type: REMOVE_ACTIVITY, payload: { id: activityId }})

  return {
    restarApp,
    setActiveId,
    removeActivity
  }
}
