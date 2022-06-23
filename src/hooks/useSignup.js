import { useState } from 'react'
import { projectAuth } from '../firebase/config'

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)

    const signup = async (email, password, displayName) => {
        // incase the function was previously called & returned an error
        // this clears it back to null
        setError(null)
        setIsPending(true)

        try{
            // try to signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

            // incase the response fails for whatever reason
            if(!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            await res.user.updateProfile({ displayName: displayName})

            setIsPending(false)
            setError(null)
        }
        catch(err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signup }
}