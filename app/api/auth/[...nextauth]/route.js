import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from "@utils/database"
import user from "@modals/user"



const handle = NextAuth(
    {
        providers : [
            GoogleProvider({
                clientId : process.env.GOOGLE_ID,
                clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            })
        ],
        async session({session}){
            const sessionUser = await User.findOne({
                email : session.user.email
            })
            session.user.id = sessionUser._id.toString()

        },
        async signIn({profile})
        {
            try {
                await connectToDB();
                const userExist = await User.findOne({
                    email : profile.email
                });
                if(!userExist ){
                    await User.create(
                       { email : profile.email,
                        userName : profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture}
                    )
                }
                return true
                
            } catch (error) { 
                console.log(error)
                return false
                
            }

        }
    }
)
export {handle as GET , handle as POST}