
import { StoreContext, Product, Order, OrderStatus } from './types';
import { MERCHANTS, PRODUCTS_MOCK } from './config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟内存中的订单状态
const orderStatusStore: Record<string, OrderStatus> = {};

export const api = {
  // 1. 解析场景码 (GET /context/resolve?scene_code=...)
  async resolveContext(sceneCode: string): Promise<StoreContext> {
    await delay(800);
    const m = sceneCode.includes('MIO') ? MERCHANTS[1] : MERCHANTS[0];
    return {
      id: m.id,
      name: m.name,
      table_no: sceneCode.includes('TABLE') ? 'A' + (Math.floor(Math.random() * 20) + 1) : undefined,
      allow_order: m.features.dineIn,
      allow_pay: true,
      address: '虚拟商业中心 A座 102',
      order_type_default: sceneCode.includes('TABLE') ? 'DINE_IN' : 'PICK_UP',
      theme: {
        primary: m.theme.primary,
        secondary: m.theme.secondary
      }
    };
  },

  // 2. 获取菜单
  async getMenu(storeId: string): Promise<Product[]> {
    await delay(600);
    return PRODUCTS_MOCK[storeId] || PRODUCTS_MOCK['TX1'];
  },

  // 3. 试算
  async calculatePrice(items: any[]): Promise<{ total: number; discount: number }> {
    await delay(300);
    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    return { total, discount: total > 100 ? 10 : 0 };
  },

  // 4. 下单
  async createOrder(data: any): Promise<Order> {
    await delay(1000);
    const id = 'ORD' + Math.random().toString(36).substr(2, 6).toUpperCase();
    orderStatusStore[id] = OrderStatus.PENDING_PAY;
    return {
      id,
      storeId: data.storeId,
      storeName: data.storeName,
      status: OrderStatus.PENDING_PAY,
      totalAmount: data.total,
      items: data.items,
      takeNo: 'B' + Math.floor(Math.random() * 900 + 100),
      createdAt: new Date().toISOString()
    };
  },

  // 5. 支付模拟
  async requestPayment(orderId: string): Promise<boolean> {
    await delay(1500);
    const success = window.confirm(`[微信支付模拟]\n\n订单编号: ${orderId}\n实付金额: 正在计算...\n\n点击"确定"模拟支付成功`);
    if (success) {
      orderStatusStore[orderId] = OrderStatus.PAID;
    }
    return success;
  },

  // 6. 订单状态轮询 (带状态演变模拟)
  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    await delay(500);
    const current = orderStatusStore[orderId] || OrderStatus.PENDING_PAY;
    
    // 模拟状态推进 (10% 概率推进到下一阶段)
    if (Math.random() > 0.85) {
      const next: Record<string, OrderStatus> = {
        [OrderStatus.PENDING_PAY]: OrderStatus.PAID,
        [OrderStatus.PAID]: OrderStatus.PREPARING,
        [OrderStatus.PREPARING]: OrderStatus.READY,
        [OrderStatus.READY]: OrderStatus.COMPLETED
      };
      if (next[current]) {
        orderStatusStore[orderId] = next[current];
      }
    }
    
    return orderStatusStore[orderId];
  }
};
