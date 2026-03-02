"use client"

import { useState } from "react"
import { IGroup } from "@/models/group-model"
import { IGroupStudent } from "@/models/group-student-model"
import { getApi, deleteApi } from "@/utils/server-api"
import { TrashIcon } from "@heroicons/react/24/outline"

interface IProps {
  groups: IGroup[]
}

export function StudentList({ groups }: IProps) {
  const [students, setStudents] = useState<IGroupStudent[]>([])

  const [selectedGroupId, setSelectedGroupId] = useState<string>("")

  const handleGroupClick = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = e.target.value
    setSelectedGroupId(groupId)

    if (!groupId) {
      setStudents([])
      return
    }

    const data = await getApi<IGroupStudent[]>(`/api/group-students/${groupId}`)
    setStudents(data ?? [])
  }

  const handleDelete = async (studentId?: string) => {
    if (!studentId) return
    if (confirm("Ar tikrai norite ištrinti šį studentą?")) {
      await deleteApi("/api/group-students/student", studentId)

      if (selectedGroupId) {
        const data = await getApi<IGroupStudent[]>(
          `/api/group-students/${selectedGroupId}`,
        )
        setStudents(data ?? [])
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="group-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Pasirinkite grupę:
        </label>
        <select
          id="group-select"
          onChange={handleGroupClick}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">-- Visos grupės --</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {students.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Vardas
              </th>
              <th scope="col" className="px-6 py-3">
                Pavardė
              </th>
              <th scope="col" className="px-6 py-3">
                Veiksmai
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-white border-b">
                <td className="px-6 py-4">{student.firstName}</td>
                <td className="px-6 py-4">{student.lastName}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(student.id)}>
                    <TrashIcon className="w-5 h-5 stroke-red-600 hover:stroke-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Šioje grupėje studentų nerasta.
        </p>
      )}
    </div>
  )
}
