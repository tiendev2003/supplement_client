import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemCard } from "./CartItemCard";

export function CartSidebar({ isOpen, onClose }) {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Tray Table",
      color: "Black",
      price: 19.19,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Tray Table",
      color: "Red",
      price: 19.19,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Table lamp",
      color: "gold",
      price: 39.0,
      quantity: 2,
      image: "/placeholder.svg",
    },
  ]);

  const updateQuantity = (id, quantity) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + 135; // Adding fixed shipping cost

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white px-6 py-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Dialog.Title className="text-lg font-semibold">
                Cart
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center rounded-lg bg-black px-6 py-3 text-base font-medium text-white hover:bg-gray-900"
                    onClick={onClose}
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/cart"
                    className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
