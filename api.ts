
import { MerchantConfig, Product } from './types';
import { MERCHANTS as MOCK_MERCHANTS, PRODUCTS_MOCK } from './config';

const API_BASE = '/api';

export const api = {
  async getMerchants(): Promise<MerchantConfig[]> {
    try {
      const res = await fetch(`${API_BASE}/merchants`);
      if (!res.ok) throw new Error('API server returned error');
      return await res.json();
    } catch (err) {
      console.warn("Backend connection failed. Falling back to static configuration.", err);
      // Resilience: Return local mock data if the API is down
      return MOCK_MERCHANTS;
    }
  },

  async getMenu(merchantId: string): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE}/merchants/${merchantId}/menu`);
      if (!res.ok) throw new Error('Failed to fetch menu');
      return await res.json();
    } catch (err) {
      console.warn(`Could not load menu for ${merchantId} from server, returning mock data.`, err);
      // Resilience: Return local mock data for the specific merchant if the API fails
      return PRODUCTS_MOCK[merchantId] || [];
    }
  },

  async createOrder(orderData: any): Promise<{ success: boolean; orderId: string }> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  }
};
