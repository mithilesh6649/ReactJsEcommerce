import { useState } from "react";
import Layout from "../Layout";
const Payment = () => {

    const [payments, setPayments] = useState([
        {
            orderId: '#rty45678',
            customerName: 'Er Mithilesh Kumar',
            email: 'mithileshkumar6649@gmail.com',
            mobile: '+91 7651919073',
            product: 'lenovo ideapad 360',
            amount: 52000,
            date: '12-10-2024 10:15:14 Am',
            status: 'pending'
        }
    ]);



    return (
        <>
            <Layout>
                <div>
                    <h1 className="text-xl font-semibold">Payments</h1>
                    <div className="mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-rose-600 text-white">
                                    <th className="py-4">Payment Id</th>
                                    <th>Customer`s Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    payments.map((item, index) => (
                                        <tr className="text-center" key={index} style={{
                                            background: (index + 1) % 2 === 0 ? '#f1f5f9' : 'white'
                                        }}>
                                            <td className="py-4">Payment Id</td>
                                            <td>Customer`s Name</td>
                                            <td>Email</td>
                                            <td>Mobile</td>
                                            <td>Product</td>
                                            <td>Amount</td>
                                            <td>Date</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>

        </>
    );



}

export default Payment;