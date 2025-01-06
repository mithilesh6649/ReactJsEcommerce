import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import firebaseConfigApp from "../../../../util/firebase.config"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
const auth = getAuth(firebaseConfigApp);
const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)


    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const loginFcn = async (e) => {

        try {
            e.preventDefault();
            if (formValue.email.length <= 0) {
                setError('Email is required')
                return false;
            }

            const user = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
            navigate('/');
            console.log(user);

        } catch (err) {
            seterr(err.message)
        }
    }

    const handleOnChange = (e) => {
        var currentElement = e.target;
        var value = currentElement.value;
        var name = currentElement.name;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setError(null)
    }

    const [passwordType, setPasswordType] = useState("password")
    return (
        <div className="grid md:grid-cols-2 md:h-screen md:overflow-hidden animate__animated animate__fadeIn">

            <img src="/images/signup.jpg" className="w-full md:h-full h-24 object-cover" />
            <div className="flex flex-col md:p-16 p-8">
                {JSON.stringify(formValue)}
                <h1 className="text-4xl font-bold">Signin</h1>
                <p className="text-lg text-gray-600">Enter profile details to login</p>
                <form className="mt-8 space-y-6" onSubmit={loginFcn}>
                    <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-1">Email id</label>
                        <input
                            onChange={handleOnChange}
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            className="p-3 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex flex-col relative">
                        <label className="font-semibold text-lg mb-1">Password</label>
                        <input
                            onChange={handleOnChange}
                            type={passwordType}
                            name="password"
                            placeholder="********"
                            className="p-3 border border-gray-300 rounded"
                        />
                        <button onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")} type="button" className="absolute top-11 right-4 w-8 h-8 rounded-full hover:bg-blue-200 hover:text-blue-600">
                            {
                                passwordType === "password" ?
                                    <i className="ri-eye-line"></i>
                                    :
                                    <i className="ri-eye-off-line"></i>
                            }
                        </button>
                    </div>

                    <button className="py-3 px-8 rounded bg-blue-600 text-white font-semibold hover:bg-rose-600">Login</button>
                </form>
                <div className="mt-2">
                    Don`t have an account ? <Link to="/signup" className="text-blue-600 font-semibold">Register now</Link>
                </div>

                {
                    error &&
                    <div className="flex justify-between items-center mt-2 bg-rose-600 p-3 rounded shadow text-white font-semibold animate__animated animate__pulse">
                        <p>{error}</p>
                        <button onClick={() => setError(null)}>
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login