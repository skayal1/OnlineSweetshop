// Separate API service logic
import { Order } from '../types';
import { API_CONFIG } from '../config/constants';

export const orderService = {
  async saveOrder(order: Order) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }
};