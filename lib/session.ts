import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebToken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { log } from "console";
import { SessionInterface, UserProfile } from '@/common.types'
import { getUser } from './actions'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // jwt: {
    //     encode: ({secret, token}) =>{

    //     }
    //     decode: async({secret, token}) =>{
            
    //     }
    // },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },
    callbacks: {
        async session({ session }) {
            // const email = session?.user?.email as string;

            // const userExists = await getUser(user?.email as string) as {user?: UserProfile}

            return session

        },
        async signIn({ user } : { user: AdapterUser | User}) {
            try {
                const userExists = await getUser(user?.email as string) as { user?: UserProfile }
                if (!userExists) {
                    
                }
                return true
            }catch(err: any) {
                console.log(err)
                return false
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface

    return session
}