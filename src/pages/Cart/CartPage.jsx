import { Button } from '@headlessui/react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItems from "../../components/cart/CartItem";
import CartProgress from "../../components/cart/CartProgress";
import CartSummary from "../../components/cart/CartSummary";
import CheckoutForm from "../../components/cart/CheckoutForm";
import CouponForm from "../../components/cart/CouponForm";
import OrderSummary from "../../components/cart/OrderSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tray Table",
      color: "Black",
      price: 19.0,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Tray Table",
      color: "Red",
      price: 19.0,
      quantity: 2,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Table lamp",
      color: "Gold",
      price: 39.0,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]);

  const [shippingMethod, setShippingMethod] = useState("free");
  const [step, setStep] = useState(1);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCosts = {
    free: 0,
    express: 15.0,
    pickup: 21.0,
  };

  const total = subtotal + shippingCosts[shippingMethod];
  const handleSubmit = async (formData) => {
    // Handle form submission
    console.log("Form submitted:", formData);
    // Redirect to confirmation page
    setStep(3);
  };
  const orderDetails = {
    orderCode: "#0123_45678",
    date: "October 19, 2023",
    total: 1345.0,
    paymentMethod: "Credit Card",
    items: [
      {
        id: 1,
        name: "Tray Table",
        color: "Black",
        quantity: 2,
        image: "/placeholder.svg",
      },
      {
        id: 2,
        name: "Tray Table",
        color: "Red",
        quantity: 2,
        image: "/placeholder.svg",
      },
      {
        id: 3,
        name: "Table lamp",
        color: "Gold",
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          Cart
        </h1>

        <CartProgress currentStep={step} />
        {step === 1 && (
          <div className="mt-6 space-y-6 sm:mt-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
            <div className="lg:col-span-8">
              <CartItems
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
              <div className="mt-6">
                <CouponForm />
              </div>
            </div>

            <div className="lg:col-span-4">
              <CartSummary
                subtotal={subtotal}
                shipping={shippingCosts[shippingMethod]}
                total={total}
                shippingMethod={shippingMethod}
                onShippingChange={setShippingMethod}
                onClick={() => setStep(2)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mt-6 space-y-6 sm:mt-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
              <div className="lg:col-span-7">
                <CheckoutForm onSubmit={handleSubmit} />
              </div>
              <div className="lg:col-span-5">
                <OrderSummary items={cartItems} />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 text-center shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-medium sm:text-2xl">
                Thank you! 🎉
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Your order has been received
              </p>

              {/* Order Items */}
              <div className="mb-8 flex justify-center gap-4">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-gray-100 sm:h-24 sm:w-24">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                         className="object-cover"
                      />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                      {item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="mx-auto mb-8 max-w-sm space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order code:</span>
                  <span className="font-medium">{orderDetails.orderCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">
                    ${orderDetails.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment method:</span>
                  <span className="font-medium">
                    {orderDetails.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 sm:space-x-4 sm:space-y-0">
                <Button   className="w-full sm:w-auto" >
                  <Link to="/purchase-history">Purchase history</Link>
                </Button>
                <Button className="w-full sm:w-auto" >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
