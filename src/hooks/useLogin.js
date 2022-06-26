import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign the user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login action
            // notice the payload is the user object that is returned from the
            // above method
            dispatch({ type: 'LOGIN', payload: res.user })

            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if(!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    // if we use this hook and called the login function,
    // this useEffect will return a cleanup function
    // whenever the component using this hook unmounts, this 
    // cleanup function will fire, cancelling whatever is going on
    // we will only update state is IsCancelled is false
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, error, isPending }

}