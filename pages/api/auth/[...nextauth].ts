import excuteQuery from "@/lib/db"
import NextAuth, { User } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import CredentialsProvider from "next-auth/providers/credentials"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    pages: {
      error: "/signin",
      signIn: "/signin",
      signOut: "/signout",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        credentials: { regNumber: {}, password: {} },
        async authorize(credentials) {
          try {
            const results = await excuteQuery(`SELECT * FROM users WHERE regNumber='${credentials?.regNumber}' AND password='${credentials?.password}'`)
            if (results.length > 0) {
              const existingdb = await excuteQuery(`SELECT * FROM existingdb WHERE regNumber='${credentials?.regNumber}'`)
              if (results[0].userType == "student") {
                const progress = await excuteQuery("SELECT COUNT(*) AS count FROM assessment")
                const supervisor = await excuteQuery(`SELECT * FROM existingdb WHERE regNumber='${results[0].supervisor}'`)
                if (results) return { ...results[0], ...existingdb[0], progress: progress[0].count, supervisor: `${supervisor[0].firstName} ${supervisor[0].lastName}` } as User
              } else {
                if (results) return { ...results[0], ...existingdb[0] } as User
              }
            }
            throw { response: { data: "Incorrect username or password" } }
          } catch (error: any) {
            console.log(error)
            throw new Error(error.response ? error.response.data : "Failed to connect to server. Please check your internet connection and try again.")
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, trigger, session, account }) {
        if (trigger === "update") return { ...token, ...session.user }
        return { ...token, ...user }
      },
      async session({ session, token }) {
        session.user = token as any
        return session
      },
    },
  })
}