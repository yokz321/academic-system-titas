"use client"

import { ICertType } from "@/models/cert-type-model"
import { ICertificate } from "@/models/certificate-model"
import { PencilIcon } from "@heroicons/react/24/outline"

type IProps = {
  certTypes: ICertType[]
  certificates: ICertificate[]
  setEditCert: (cert: ICertificate) => void
}

export function CertList(props: IProps) {
  const { certTypes, certificates, setEditCert } = props

  const findType = (id?: string) => certTypes.find((i) => i.id === id)?.title

  const changeCert = (id?: string) => {
    if (!id) return
    const cert = certificates.find((i) => i.id === id)
    if (!cert) return
    setEditCert(cert)
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            name
          </th>
          <th scope="col" className="px-6 py-3">
            note
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((c) => (
          <tr key={c.id} className="bg-white border-b">
            <td className="px-6 py-4">{findType(c.typeId)}</td>
            <td className="px-6 py-4">{c.company}</td>
            <td className="px-6 py-4">
              <button
                title="Edit"
                onClick={() => changeCert(c.id)}
                className="flex items-center"
              >
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
