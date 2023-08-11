import clientPromise from "@/utils/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// npm install @next-auth/mongodb-adapter
const adminEmails = ['evansitoden94@gmail.com']

export const authOptions = {
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
  
}
  
const handler = NextAuth(authOptions as any)
export { handler as GET, handler as POST };

export const isAdminRequest = async (req:Request, res:Response) =>{
  const session = await getServerSession(req, res, authOptions);
  if (adminEmails.includes(session?.user?.email || '')){
    throw 'Not an admin'
  }
}