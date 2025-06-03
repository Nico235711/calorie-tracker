import type { Activity } from "../types"

type ActivityListProps = {
  activities: Activity[]
}

export default function ActivityList({ activities }: ActivityListProps) {

  console.log(activities);
  

  return (
    <>
      <h2 className="text-3xl uppercase font-black text-center">Resumen</h2>
      {
        activities.map(activity => (
          <div className="flex justify-between py-10 px-5">
            <div className="space-y-3 relative">
              <p>{activity.category}</p>
              <p>{activity.name}</p>
            </div>
            <div>

            </div>
          </div>
        ))
      }
    </>
  )
}
