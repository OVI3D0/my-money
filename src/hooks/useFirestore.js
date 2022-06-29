import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection reference
    const ref = projectFirestore.collection(collection)

    // only dispatch if not cancelled
    // we wrap the dispatch in this check so we don't have to retype it
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
        }
    }


    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            // take the current date and time, and pass it into the
            // timestamp object, which creates a new firebase timestamp
            // which is stored in the createdAt constant
            const createdAt = timestamp.fromDate(new Date())

            // doc is an object so we don't have to do this, but usually you want to
            // pass in an object
            const addedDocument = await ref.add({ ...doc, createdAt: createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {

    }

    // now, if the component is unmounted, this function will fire, and cancel
    // any updates to state our other code might try to make
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}