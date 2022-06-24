import { AuthContext } from "../context/AuthContext";
// so we can use the authcontext we just imported
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('useAuthContext must be inside an AuthcontextProvider')
    }

    // if we use this hook inside another component,
    // it returns the context to us as an object
    // the object will have the user property, and the dispatch function
    return context
}