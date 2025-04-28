import { useEffect, useState } from "react";
import firebaseConfigApp from "../../util/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
const auth = getAuth(firebaseConfigApp);
const PreGuard = () => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)
            } else {
                setSession(false)
            }
        })
    });


    if (session == null) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        )
    }

    if (session) {
        return (<Navigate to="/"></Navigate>)
    }

    return <Outlet />
}

export default PreGuard;