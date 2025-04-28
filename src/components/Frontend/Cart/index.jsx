import { useState } from "react"
import Layout from "../Layout"
const Cart = () => {
    const [products, setProducts] = useState([
        {
            title: 'nokia smarphone new',
            price: 20000,
            discount: 15,
            image: '/products/a.jpg'
        },
        {
            title: 'nokia smarphone new',
            price: 20000,
            discount: 15,
            image: '/products/b.jpg'
        },
        {
            title: 'nokia smarphone new',
            price: 20000,
            discount: 15,
            image: '/products/c.jpg'
        },
        {
            title: 'nokia smarphone new',
            price: 20000,
            discount: 15,
            image: '/products/d.jpg'
        },
        {
            title: 'nokia smarphone new',
            price: 20000,
            discount: 15,
            image: '/products/e.jpg'
        }
    ])
    return (
        <Layout>
            <div className="md:my-16 mx-auto md:w-7/12 bg-white shadow-lg border rounded-md p-8">
                <div className="flex items-center gap-4">
                    <i className="ri-shopping-cart-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Cart</h1>
                </div>
                <hr className="my-6" />
                <div className="space-y-12">
                    {
                        products.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <img src={item.image} className="w-[100px] border border-3 border-white shadow" />
                                <div>
                                    <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
                                    <div className="flex flex-col gap-4">
                                        <div className="space-x-3">
                                            <label className="text-lg font-semibold">₹{item.price - (item.price * item.discount) / 100}</label>
                                            <del>₹{item.price}</del>
                                            <label className="text-gray-500">{item.discount}% Discount</label>
                                        </div>
                                        <button className="w-fit bg-rose-600 text-white px-4 py-2 rounded">
                                            <i className="ri-delete-bin-line mr-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <hr className="my-6" />
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">Total : ₹57,000</h1>
                    <button className="bg-green-500 text-white px-12 py-3 rounded mt-4 font-semibold hover:bg-rose-600">
                        <i className="ri-shopping-bag-4-line mr-2"></i>
                        Buy Now
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Cart