import { useEffect, useState } from 'react'
import firebaseConfigApp from '../../../util/firebase.config'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout'

const auth = getAuth(firebaseConfigApp)
const storage = getStorage()

const Profile = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [formValue, setFormValue] = useState({
        fullname: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user)

            }
            else {
                setSession(false)
                navigate('/login')
            }
        })

        console.log("session", session);
    }, [])

    const setProfilePicture = async (e) => {
        const input = e.target
        const file = input.files[0]
        const filenameArray = file.name.split(".")
        const ext = filenameArray[filenameArray.length - 1]
        const filename = Date.now() + '.' + ext
        const path = `pictures/${filename}`
        const bucket = ref(storage, path)
        const snapshot = await uploadBytes(bucket, file)
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/shop-e2810.appspot.com/o/${path}`
        console.log(imageUrl)
    }

    const handleFormValue = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    if (session === null)
        return (
            <div className="bg-gray-100 h-full fixed top-0 left-0 w-full flex justify-center items-center">
                <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
                </span>
            </div>
        )

    return (

        <Layout>
            <div className='mx-auto md:my-16 shadow-lg rounded-md p-8 md:w-7/12 border'>
                <div className='flex gap-3'>
                    <i className="ri-user-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>

                <hr className='my-6' />

                <div className='w-24 h-24 mx-auto relative mb-6'>
                    <img src="/images/avt.avif" className='rounded-full w-24 h-24' />
                    <input type="file" accept="image/*" className='opacity-0 absolute top-0 left-0 w-full h-full' onChange={setProfilePicture} />
                </div>

                <form className='grid grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Fullname</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="fullname"
                            className='p-2 rounded border border-gray-300'
                            value={session.displayName}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Email</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="email"
                            type="email"
                            className='p-2 rounded border border-gray-300'
                            value={session.email}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Mobile</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="mobile"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.mobile}
                        />
                    </div>

                    <div />

                    <div className='flex flex-col gap-2 col-span-2'>
                        <label className='text-lg font-semibold'>Area/Street/Vill</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="address"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.address}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>City</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="city"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.city}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>State</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="state"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.state}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Country</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="country"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.country}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Pincode</label>
                        <input
                            onChange={handleFormValue}
                            required
                            name="pincode"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.pincode}
                        />
                    </div>
                    <button className='px-4 py-2 bg-rose-600 text-white rounded w-fit hover:bg-green-600'>
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Profile