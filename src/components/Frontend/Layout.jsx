import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import firebaseConfigApp from "../../util/firebase.config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
const auth = getAuth(firebaseConfigApp)

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [session, setSession] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(auth)
            if (user) {
                setSession(user)
            }
            else {
                setSession(false)
            }
        })
    }, [])



    const menus = [
        {
            label: "Home",
            href: '/'
        },
        {
            label: "Products",
            href: '/products'
        },
        {
            label: "Category",
            href: '/category'
        },
        {
            label: "Contact us",
            href: '/contact-us'
        }
    ]

    const mobileLink = (href) => {
        navigate(href)
        setOpen(false)
    }
    if (session === null)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600"></div>
            </div>
        );

    return (
        <div>
            <nav className="sticky top-0 left-0 shadow-lg bg-white">
                <div className="w-10/12 mx-auto flex items-center justify-between">
                    <img
                        src="/images/logo.png"
                        className="w-[100px]"
                    />

                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        <i className="ri-menu-3-fill text-3xl"></i>
                    </button>

                    <ul className="md:flex gap-6 items-center hidden">
                        {
                            menus.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.href}
                                        className="block py-8 text-center hover:bg-blue-600 w-[100px] hover:text-white"
                                    >{item.label}</Link>
                                </li>
                            ))
                        }
                        {
                            !session &&
                            <>
                                <Link
                                    className="block py-8 text-center hover:bg-blue-600 w-[100px] hover:text-white"
                                    to="/login"
                                >Login</Link>

                                <Link
                                    className="bg-blue-600 py-3 px-10 text-md font-semibold text-white block text-center hover:bg-rose-600 hover:text-white"
                                    to="/signup"
                                >Signup</Link>
                            </>
                        }



                        {
                            session &&
                            <>
                                <h2 onClick={() => setDropdown(!dropdown)} >
                                    {
                                        session && session.displayName
                                    }

                                    {
                                        !session && "Raj Kumar"
                                    }
                                </h2>
                                {dropdown &&
                                    <>
                                        <div className=" justify-center bg-gray-100 mb-5">
                                            <br></br>
                                            <br></br>

                                            <div className="absolute right-0 z-10 mt-300 w-48 bg-white rounded-md shadow-lg">
                                                <div className="py-1">
                                                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                        Profile
                                                    </a>
                                                    <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                        Cart
                                                    </Link>
                                                    <button
                                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                                        onClick={() => signOut(auth)}
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        }


                    </ul>
                </div>
            </nav >
            <div>
                {children}
            </div>
            <footer className="bg-orange-600 py-16">
                <div className="w-10/12 mx-auto grid md:grid-cols-4 md:gap-0 gap-8">
                    <div>
                        <h1 className="text-white font-semibold text-2xl mb-3">Website Links</h1>
                        <ul className="space-y-2 text-slate-50">
                            {
                                menus.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.href}>{item.label}</Link>
                                    </li>
                                ))
                            }
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-2xl mb-3">Follow us</h1>
                        <ul className="space-y-2 text-slate-50">
                            <li><Link to="/">Facebook</Link></li>
                            <li><Link to="/">Youtube</Link></li>
                            <li><Link to="/">Twitter</Link></li>
                            <li><Link to="/">Linkedin</Link></li>
                            <li><Link to="/">Instagram</Link></li>
                        </ul>
                    </div>
                    <div className="pr-8">
                        <h1 className="text-white font-semibold text-2xl mb-3">Brand Details</h1>
                        <p className="text-slate-50 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad saepe cupidium est velit excepturi sit corrupti tempora officia recusandae!</p>
                        <img
                            src="/images/logo.png"
                            className="w-[100px]"
                        />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-2xl mb-3">Contact us</h1>
                        <form className="space-y-4">
                            <input
                                required
                                name="fullname"
                                className="bg-white w-full rounded p-3"
                                placeholder="Your name"
                            />

                            <input
                                required
                                type="email"
                                name="email"
                                className="bg-white w-full rounded p-3"
                                placeholder="Enter email id"
                            />

                            <textarea
                                required
                                name="message"
                                className="bg-white w-full rounded p-3"
                                placeholder="Message"
                                rows={3}
                            />

                            <button className="bg-black text-white py-3 px-6 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </footer>


            <aside
                className="overflow-hidden md:hidden bg-slate-900 shadow-lg fixed top-0 left-0 h-full z-50"
                style={{
                    width: open ? 250 : 0,
                    transition: '0.3s'
                }}
            >
                <div className="flex flex-col p-8 gap-6">
                    {
                        menus.map((item, index) => (
                            <button onClick={() => mobileLink(item.href)} key={index} className="text-white">
                                {item.label}
                            </button>
                        ))
                    }
                </div>
            </aside>
        </div >
    )
}

export default Layout