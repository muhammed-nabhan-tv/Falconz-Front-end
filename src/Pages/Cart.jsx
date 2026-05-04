
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user, updateUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const navigate = useNavigate();
  // Load cart from the user data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data: userData } = await api.get(`/users/${user.id}`);
        setCartItems(userData.cart || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Quantity function
  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(cartId);
    try {
      const updated = cartItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updated);
      
      const updatedUser = { ...user, cart: updated };
      
      // Update in backend
      await api.put(`/users/${user.id}`, updatedUser);
      
      // Update in context and localStorage
      updateUser(updatedUser);
      
    } catch (err) {
      console.error('Error updating quantity:', err);
      toast.error('Failed to update quantity');
    } finally {
      setUpdating(null);
    }
  };

  // Cart remove function
  const removeFromCart = async (cartId) => {
    setUpdating(cartId);
    try {
      const updated = cartItems.filter(item => item.cartId !== cartId);
      setCartItems(updated);
      
      const updatedUser = { ...user, cart: updated };
      
      // Update in backend
      await api.put(`/users/${user.id}`, updatedUser);
      
      // Update in context and localStorage
      updateUser(updatedUser);
      toast.success("Item removed from cart", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error('Error removing from cart:', err);
      toast.error('Failed to remove item from cart');
    } finally {
      setUpdating(null);
    }
  };

  // Remove all from cart
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) return;
    
    try {
      const updatedUser = { ...user, cart: [] };
      
      // Update in backend
      await api.put(`/users/${user.id}`, updatedUser);
      
      // Update in context and localStorage
      updateUser(updatedUser);
      setCartItems([]);
      toast.success("Cart cleared successfully");
      
    } catch (err) {
      console.error('Error clearing cart:', err);
      toast.error('Failed to clear cart');
    }
  };

  // Total price calc
  const calculateTotal = () => cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price || 0);
    return sum + (price * (item.quantity || 1));
  }, 0);

  const calculateTotalItems = () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Navigate to checkout page
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cartItems, total: calculateTotal() } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">
                {calculateTotalItems()} {calculateTotalItems() === 1 ? 'item' : 'items'} in your cart
                {user && <span className="text-green-600 ml-2">Welcome, {user.name}!</span>}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Cart
                </button>
              )}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <div key={item.cartId} className="p-6 flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"; }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description || "Fresh and high-quality product"}</p>
                            <p className="text-green-600 font-semibold mt-2">
                              ₹{typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            disabled={updating === item.cartId}
                            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                            title="Remove from cart"
                          >
                            {updating === item.cartId ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                            ) : (
                              '❌'
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.cartId, (item.quantity || 1) - 1)}
                                disabled={updating === item.cartId || (item.quantity || 1) <= 1}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-semibold">{item.quantity || 1}</span>
                              <button
                                onClick={() => updateQuantity(item.cartId, (item.quantity || 1) + 1)}
                                disabled={updating === item.cartId}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              ₹{((typeof item.price === 'number' ? item.price : parseFloat(item.price || 0)) * (item.quantity || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({calculateTotalItems()})</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{(calculateTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={proceedToCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 mt-6"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>Free shipping on orders over $50</p>
                    <p>30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block">
                Explore Products
              </Link>
              <Link to="/wishlist" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block">
                View Wishlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;