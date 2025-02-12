"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Plus, X, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Exercise {
  name: string
  weight: string
  sets: string
  reps: string
}

interface WorkoutPlan {
  name: string
  exercises: Exercise[]
}

export default function ProfileWorkouts() {
  const pathname = usePathname()
  const user = pathname.split("/").pop()

  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newWorkout, setNewWorkout] = useState<WorkoutPlan>({ name: "", exercises: [] })

  useEffect(() => {
    const savedWorkouts = localStorage.getItem(`workouts_${user}`)
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts))
    }
  }, [user])

  const saveWorkouts = (updatedWorkouts: WorkoutPlan[]) => {
    setWorkouts(updatedWorkouts)
    localStorage.setItem(`workouts_${user}`, JSON.stringify(updatedWorkouts))
  }

  const addWorkout = () => {
    if (newWorkout.name && newWorkout.exercises.length > 0) {
      const updatedWorkouts = [...workouts, newWorkout]
      saveWorkouts(updatedWorkouts)
      setNewWorkout({ name: "", exercises: [] })
      setIsModalOpen(false)
    }
  }

  const addExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { name: "", weight: "", sets: "", reps: "" }],
    })
  }

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const updatedExercises = newWorkout.exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise,
    )
    setNewWorkout({ ...newWorkout, exercises: updatedExercises })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
        <ChevronLeft size={20} />
        <span>Back to Profiles</span>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 capitalize">{user}'s Workouts</h1>

      {workouts.length === 0 ? (
        <p className="text-center text-gray-600">No workouts yet. Add some!</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {workouts.map((workout, index) => (
            <li key={index} className="bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-purple-600">{workout.name}</h2>
              <ul className="space-y-2">
                {workout.exercises.map((exercise, exIndex) => (
                  <li key={exIndex} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-gray-600">
                      {exercise.weight} lbs | {exercise.sets} sets | {exercise.reps} reps
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors duration-300"
        aria-label="Create new workout plan"
      >
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">New Workout Plan</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Workout Name"
              value={newWorkout.name}
              onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            {newWorkout.exercises.map((exercise, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, "name", e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Weight (lbs)"
                    value={exercise.weight}
                    onChange={(e) => updateExercise(index, "weight", e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(index, "sets", e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(index, "reps", e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addExercise}
              className="w-full bg-gray-200 text-gray-800 p-2 rounded mb-4 hover:bg-gray-300 transition-colors duration-300"
            >
              Add Exercise
            </button>
            <button
              onClick={addWorkout}
              className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors duration-300"
            >
              Save Workout Plan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

