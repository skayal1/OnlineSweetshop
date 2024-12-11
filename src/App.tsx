import React, { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { OrderForm } from './components/OrderForm';
import { OrderFormData, WatchVariant } from './types';
import { orderService } from './services/api';
import { ShoppingBag } from 'lucide-react';
import { watchVariants } from './data/products';

function App() {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<WatchVariant>(watchVariants[0]);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    quantity: 1,
    variant: watchVariants[0]
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (data: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setFormData((prev) => ({ ...prev, quantity: newQuantity }));
  };

  const handleVariantChange = (variant: WatchVariant) => {
    setSelectedVariant(variant);
    setFormData((prev) => ({ ...prev, variant }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
      };

      await orderService.saveOrder(order);
      setOrderPlaced(true);
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Thank you for your purchase. We'll contact you shortly.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Moa Collection
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductCard 
            quantity={quantity} 
            selectedVariant={selectedVariant}
            onQuantityChange={handleQuantityChange}
            onVariantChange={handleVariantChange}
          />
          <OrderForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}