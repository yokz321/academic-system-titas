import { Wrapper } from "@/components/certificates/wrapper"
import { CertType } from "@/models/cert-type-model"
import { connectMongoose } from "@/utils/mongoose-client"
export default async function CertificatesPage() {
  await connectMongoose()
  const certTypes = await CertType.find().lean()
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Certificates Management</h1>
      {}
      <Wrapper certTypes={JSON.parse(JSON.stringify(certTypes))} />
    </main>
  )
}
