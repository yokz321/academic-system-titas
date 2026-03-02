import { connectMongoose } from "@/utils/mongoose-client"
import { GroupStudent } from "@/models/group-student-model"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params

  await connectMongoose()

  const students = await GroupStudent.find({ groupId: groupId }).lean()

  return Response.json(students)
}
