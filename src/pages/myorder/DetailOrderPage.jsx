import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailOrderPage = () => {
    const { id } = useParams();
    const [order] = useState({
        id:  id,
        number: "#3456_768",
        date: "October 17, 2023",
        status: "Delivered",
        items: [
          {
            id: "1",
            name: "Modern Sofa",
            price: 999.0,
            quantity: 1,
            image: "/placeholder.svg",
          },
          {
            id: "2",
            name: "Table Lamp",
            price: 235.0,
            quantity: 1,
            image: "/placeholder.svg",
          },
        ],
        subtotal: 1234.0,
        shipping: 0,
        total: 1234.0,
      })
    
      return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/account/orders" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </div>
    
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order {order.number}</h1>
              <p className="mt-2 text-sm text-gray-500">
                Placed on {order.date} · {order.status}
              </p>
            </div>
    
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
    
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="text-gray-900">${order.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Shipping</p>
                    <p className="text-gray-900">Free</p>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <p className="text-gray-900">Total</p>
                    <p className="text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-base font-medium text-gray-900">Shipping Information</h2>
              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p>Sofia Havertz</p>
                <p>(+1) 234 567 890</p>
                <p>345 Long Island, NewYork, United States</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default DetailOrderPage