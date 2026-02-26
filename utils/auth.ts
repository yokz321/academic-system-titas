import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js"
import mongoose from "mongoose"
import { MongoClient } from "mongodb"
import { connectMongoose } from "@/utils/mongoose-client"

await connectMongoose()

const client = new MongoClient(process.env.MONGO_URI!)
const db = client.db(process.env.MONGO_DB!)

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session
