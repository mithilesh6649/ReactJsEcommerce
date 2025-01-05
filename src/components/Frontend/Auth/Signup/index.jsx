import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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



    const handleOnChange = (e) => {
        let currentInput = e.target;
        setFormValue({
            ...formValue,
            [currentInput.name]: currentInput.value
        });
        setError(null)
        console.log(formValue);
    }

    return (
        <div className="grid md:grid-cols-2 md:h-screen md:overflow-hidden animate__animated animate__fadeIn">
            <img src="/images/signup.jpg" className="w-full md:h-full h-24 object-cover" />
            <div className="flex flex-col md:p-16 p-8">
                <h1 className="text-4xl font-bold">New User</h1>
                <p className="text-lg text-gray-600">Create your account to start shopping</p>
                <form className="mt-8 space-y-6">
                    <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-1">Fullname</label>
                        <input
                            onChange={handleOnChange}
                            required
                            name="fullname"
                            placeholder="Er Mithilesh Kumar"
                            className="p-3 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-lg mb-1">Email id</label>
                        <input
                            onChange={handleOnChange}
                            required
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
                            required
                            type={passwordType}
                            name="password"
                            placeholder="********"
                            className="p-3 border border-gray-300 rounded"
                        />

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
        </div>
    )
}

export default Signup