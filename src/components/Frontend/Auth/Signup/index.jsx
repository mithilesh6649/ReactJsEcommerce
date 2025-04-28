import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Joi from 'joi';
import schema from "../../validator"
import firebaseConfigApp from "../../../../util/firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

const auth = getAuth(firebaseConfigApp);
const Signup = () => {
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState("password")
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(false)

    const [formValue, setFormValue] = useState({
        fullname: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const signupFcn = async (e) => {
        e.preventDefault();

        const { error } = schema.validate(formValue, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.reduce((acc, item) => {
                acc[item.path[0]] = item.message;
                return acc;
            }, {});
            setErrors(errorMessages);
        } else {
            // If no errors, submit form data
            // console.log('Form submitted successfully with data:', formData);
            setErrors({});
        }



        try {
            e.preventDefault()
            setLoader(true)
            await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
            await updateProfile(auth.currentUser, { displayName: formValue.fullname })
            navigate('/')
        } catch (error) {
            setError(error.message)
        } finally {
            console.log('fffffffff')
            setLoader(false)
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

        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    }



    return (
        <div className="grid md:grid-cols-2 md:h-screen md:overflow-hidden animate__animated animate__fadeIn">
            <img src="/images/signup.jpg" className="w-full md:h-full h-24 object-cover" />
            <div className="flex flex-col md:p-16 p-8">
                {JSON.stringify(formValue)}
                <h1 className="text-4xl font-bold">New User</h1>
                <p className="text-lg text-gray-600">Create your account to start shopping</p>
                <form className="mt-8 space-y-6" onSubmit={signupFcn} >
                    <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-1">Fullname</label>
                        <input
                            onChange={handleOnChange}
                            name="fullname"
                            placeholder="Er Mithilesh Kumar"
                            className="p-3 border border-gray-300 rounded"
                        />
                        {errors.fullname && <span style={{ color: 'red' }}>{errors.fullname}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-1">Email id</label>
                        <input
                            onChange={handleOnChange}

                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            className="p-3 border border-gray-300 rounded"
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

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
                        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                    </div>
                    {
                        loader ?
                            <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
                            :
                            <button className="py-3 px-8 rounded bg-blue-600 text-white font-semibold hover:bg-rose-600">Signup</button>
                    }
                </form>

                <div className="mt-2">
                    Already have an account ? <Link to="/login" className="text-blue-600 font-semibold">Signin</Link>
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
        </div >
    )
}

export default Signup