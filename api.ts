
import { StoreContext, Product, Order, OrderStatus } from './types';
import { MERCHANTS, PRODUCTS_MOCK } from './config';

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // 1. 解析场景码 (扫码入口)
  async resolveContext(sceneCode: string): Promise<StoreContext> {
    await delay(800);
    // 从模拟的商家列表中找到第一个作为默认返回
    const merchant = MERCHANTS[0];
    return {
      id: merchant.id,
      name: merchant.name + '（模拟店）',
      table_no: 'A08',
      allow_order: merchant.features.dineIn,
      address: '演示环境地址',
      theme: {
        primary: merchant.theme.primary,
        secondary: merchant.theme.secondary
      }
    };
  },

  // 2. 获取菜单 - 修复：从 config.ts 的 PRODUCTS_MOCK 获取数据，不再尝试真实的网络请求
  async getMenu(storeId: string): Promise<Product[]> {
    await delay(500);
    const menu = PRODUCTS_MOCK[storeId];
    if (!menu) {
      // 降级处理：如果没有匹配的 storeId，尝试返回 TX1 的数据
      return PRODUCTS_MOCK['TX1'] || [];
    }
    return menu;
  },

  // 3. 购物车试算
  async calculatePrice(storeId: string, items: any[]): Promise<{ total: number; discount: number }> {
    await delay(300);
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { total: subtotal, discount: 0 };
  },

  // 4. 下单
  async createOrder(data: { storeId: string; items: any[]; type: string }): Promise<Order> {
    await delay(1000);
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      storeId: data.storeId,
      storeName: MERCHANTS.find(m => m.id === data.storeId)?.name || '未知门店',
      status: OrderStatus.PENDING_PAY,
      totalAmount: data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      items: data.items,
      createdAt: new Date().toISOString()
    };
    return order;
  },

  // 5. 获取支付参数并调用支付
  async requestPayment(orderId: string): Promise<boolean> {
    console.log(`正在调起模拟微信支付: ${orderId}`);
    await delay(1500);
    return true; // 模拟支付成功
  },

  // 6. 获取订单状态 (用于详情页轮询)
  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    await delay(500);
    return OrderStatus.PAID;
  }
};
