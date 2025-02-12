import Link from "next/link"
import { Plus } from "lucide-react"

const users = [
  { name: "Abdul", icon: "🏋️" },
  { name: "Akqib", icon: "🏃" },
  { name: "Shuhen", icon: "🧘" },
  { name: "Fabyan", icon: "🚴" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Hamster</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <Link
            key={user.name}
            href={`/workouts/${user.name.toLowerCase()}`}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-purple-50 group"
          >
            <div className="text-4xl mb-4">{user.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600">{user.name}</h2>
          </Link>
        ))}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors duration-300"
        aria-label="Create new workout plan"
      >
        <Plus size={24} />
      </button>
    </div>
  )
}
