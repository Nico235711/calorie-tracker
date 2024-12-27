import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { v4 as uuidv4 } from 'uuid';

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0
}

export const useForm = (state: ActivityState, dispatch: Dispatch<ActivityActions>) => {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      // obtengo la actividad con el mismo id
      // const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      const selectedActivity = state.activities.find(stateActivity => stateActivity.id === state.activeId)
      if (selectedActivity) setActivity(selectedActivity)
    }
  }, [state.activeId]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    const isNumberField = ["category", "calories"].includes(e.target.id)

    // convierte un campo especifico a número
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // disparo mi acción
    dispatch({
      type: "save-activity",
      payload: {
        newActivity: activity
      }
    })

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    // trim() elimina los espacios al principio y al final
    return name.trim() !== "" && calories > 0
  }

  return {
    activity,
    handleChange,
    handleSubmit,
    isValidActivity
  }
}
