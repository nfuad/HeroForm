import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/spreadsheets',
        },
      },
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      // allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async signIn({ user, account }) {
      const accounts = await prisma.user
        .findUnique({
          where: {
            email: user.email,
          },
        })
        .accounts()

      await prisma.account.update({
        where: {
          id: accounts[0].id,
        },
        data: {
          refresh_token: account.refresh_token,
          access_token: account.access_token,
        },
      })

      // return a promise that resolves to make typescript happy
      return Promise.resolve(true)
    },
  },
})
