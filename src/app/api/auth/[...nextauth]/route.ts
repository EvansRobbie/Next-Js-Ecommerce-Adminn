import clientPromise from "@/utils/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// npm install @next-auth/mongodb-adapter
const adminEmails = ['evansitoden94@gmail.com']

const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      // ...add more providers here
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      session: ({ session, token, user}:{session:any, token:any, user:any}) =>{
        // console.log({ session, token, user})
        if (adminEmails.includes(session.user?.email || '')) {
          return session;
        } else {
          return null; 
        }
      },
    },
    pages: {
      signIn: '/login',
    }
  
}
  
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

export const isAdminRequest = async () =>{
  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!adminEmails.includes(session?.user?.email || '')){
    throw 'Not an admin'
  }
}