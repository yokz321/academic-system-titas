import { NextRequest } from "next/server"
import { connectMongoose } from "@/utils/mongoose-client"
import { GroupStudent } from "@/models/group-student-model"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string }> },
) {
  const { studentId } = await params

  await connectMongoose()

  await GroupStudent.findByIdAndDelete(studentId)

  return Response.json({ message: "Studentas sėkmingai ištrintas" })
}
