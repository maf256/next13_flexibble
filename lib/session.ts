import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebToken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { log } from "console";

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
            return session

        },
        async signIn({ user } : { user: AdapterUser | User}) {
            try {
                return true
             }catch(err: any) {
                console.log(err)
                return false
            }
        }
    }
}