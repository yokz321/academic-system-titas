import { ICertificate } from "@/models/certificate-model"
import { CertificateService } from "@/services/certificate-service"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const certificate: ICertificate = await request.json()
  const certificateService = new CertificateService()
  await certificateService.updateCertificate(certificate)
  return Response.json({ message: "The update was completed successfully" })
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  const { certificateId } = await params
  const certificateService = new CertificateService()
  await certificateService.deleteCertificate(certificateId)

  return Response.json({ message: "The deletion was completed successfully" })
}
