import Image from "next/image";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "@/rtk/features/cartSlice";
import { useRouter } from "next/navigation";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleProceedToCheckout = () => {
    onClose(); // Close the cart
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">My Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white rounded-md mb-4 ">
                <div className="flex items-center">
                  <div className="relative flex w-full flex-row justify-between px-1 py-4">
                    <div className="absolute z-40 -ml-1 -mt-2">
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
                      >
                        <X size={20} color="#fff" />
                      </button>
                    </div>
                    <div className="flex flex-row">
                      <div className="size-16 max-w-16 min-w-16 rounded-xl overflow-hidden bg-[#d4d4d4] border border-[#d4d4d4] relative">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="z-30 ml-2 flex flex-row space-x-4">
                        <div className="flex flex-1 flex-col text-base">
                          <h3 className="leading-tight">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-16 flex-col justify-between">
                    <p className="flex justify-end space-y-2 text-right text-sm">
                      ${item.newPrice} <span className="ml-1 inline">USD</span>
                    </p>
                    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 ">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$0.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-primary text-black py-2 rounded-md  transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
          <ShoppingCart size={64} className="text-gray-300 mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</p>
          <p className="text-gray-500 mb-4">Looks like you haven&apos;t added any items to your cart yet.</p>
          <button onClick={onClose} className="bg-primary text-black py-2 px-4 rounded-md  transition-colors">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
