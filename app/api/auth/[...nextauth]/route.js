import User from "@model/user";
import NextAuth from "@node_modules/next-auth";
import { connectDB } from "@utils/connectDB";
import GoogleProvider from 'next-auth/providers/google'

// in profile
//   email: 'teddytp330@gmail.com',
//   email_verified: true,
//   at_hash: '81uxXho0yrQmwFWs1Jbx5Q',
//   name: 'Teddy Tp',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocIK10LRpqWftXSUrJO9brlfSCOUNn5o7nHwpRXye2wJsOZaASQ=s96-c',
//   given_name: 'Teddy',
//   family_name: 'Tp',
// Session {
//     user: {
//       name: 'Teddy Tp',
//       email: 'teddytp330@gmail.com',
//       image: 'https://lh3.googleusercontent.com/a/ACg8ocIK10LRpqWftXSUrJO9brlfSCOUNn5o7nHwpRXye2wJsOZaASQ=s96-c'
//     },
//     expires: '2025-01-28T07:15:40.171Z'
//   }

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session ({ session }){
            const sessionuser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionuser._id.toString()
            return session
        },
        async signIn ({ profile }){
            try {
                connectDB()
                const userExit = await User.findOne({
                    email: profile.email
                })
    
                if( !userExit) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ','').toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false            
            }
        }
    }
})

export { handler as GET, handler as POST }