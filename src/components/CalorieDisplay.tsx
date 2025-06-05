
type CalorieDisplayProps = {
  calories: number
  text: string
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {

  return (
    <p className="grid grid-cols-1 gap-2 place-items-center mt-10 text-white text-lg">
      {calories} <span>{text}</span>
    </p>
  )
}
