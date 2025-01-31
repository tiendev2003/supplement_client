import { Package } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyOrderPage = () => {
  const [orders] = useState([
    {
      id: "1",
      number: "#3456_768",
      date: "October 17, 2023",
      status: "Delivered",
      price: 1234.0,
    },
    {
      id: "2",
      number: "#3456_980",
      date: "October 11, 2023",
      status: "Delivered",
      price: 345.0,
    },
    {
      id: "3",
      number: "#3456_120",
      date: "August 24, 2023",
      status: "Delivered",
      price: 2345.0,
    },
    {
      id: "4",
      number: "#3456_030",
      date: "August 12, 2023",
      status: "Delivered",
      price: 845.0,
    },
  ]);

  return (
    <div className="mt-10 lg:col-span-9 lg:mt-0 ">
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="border-b border-gray-200 pb-5">
          <h3 className="text-2xl font-bold leading-6 text-gray-900">
            Orders History
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start shopping to see your orders here.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                  >
                    Number ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                  >
                    Dates
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="group transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-gray-700"
                      >
                        {order.number}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                      ${order.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;
