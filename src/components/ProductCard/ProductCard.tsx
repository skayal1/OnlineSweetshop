import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { WatchVariant } from '../../types';
import { watchVariants } from '../../data/products';

interface ProductCardProps {
  quantity: number;
  selectedVariant: WatchVariant;
  onQuantityChange: (quantity: number) => void;
  onVariantChange: (variant: WatchVariant) => void;
}

export function ProductCard({ 
  quantity, 
  selectedVariant,
  onQuantityChange,
  onVariantChange 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={selectedVariant.image}
        alt={selectedVariant.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Dilicious {selectedVariant.name}</h2>
        <p className="text-gray-600 mt-2">
          Temting {selectedVariant.color} and dilicious.
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Variant
          </label>
          <div className="grid grid-cols-3 gap-2">
            {watchVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onVariantChange(variant)}
                className={`p-2 rounded-md text-sm ${
                  selectedVariant.id === variant.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-3xl font-bold text-gray-900">
            ₹{selectedVariant.price.toFixed(2)}
          </span>
        </div>
        
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Total: <span className="font-bold">₹{(selectedVariant.price * quantity).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}