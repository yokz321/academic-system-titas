import { connectMongoose } from "@/utils/mongoose-client"
import { Group } from "@/models/group-model"
import { StudentList } from "@/components/students/student-list"

export default async function GroupStudentsPage() {
  await connectMongoose()

  const groups = await Group.find().lean()

  const safeGroups = JSON.parse(JSON.stringify(groups))

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Grupių Studentai
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
        <StudentList groups={safeGroups} />
      </div>
    </main>
  )
}
