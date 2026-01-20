
import { StoreContext, Product, Order, OrderStatus } from './types';
import { MERCHANTS, PRODUCTS_MOCK } from './config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // 1. 解析场景码 (GET /context/resolve?scene_code=...)
  async resolveContext(sceneCode: string): Promise<StoreContext> {
    await delay(800);
    // 默认根据 sceneCode 的特征关联不同的商户
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

  // 2. 获取菜单 (GET /menu?store_id=...)
  async getMenu(storeId: string): Promise<Product[]> {
    await delay(600);
    return PRODUCTS_MOCK[storeId] || PRODUCTS_MOCK['TX1'];
  },

  // 3. 试算 (POST /cart/price)
  async calculatePrice(items: any[]): Promise<{ total: number; discount: number }> {
    await delay(300);
    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    return { total, discount: total > 100 ? 10 : 0 };
  },

  // 4. 下单 (POST /orders)
  async createOrder(data: any): Promise<Order> {
    await delay(1000);
    return {
      id: 'ORD' + Math.random().toString(36).substr(2, 6).toUpperCase(),
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
    // 模拟微信原生支付弹窗体验
    return window.confirm(`[微信支付模拟]\n\n订单编号: ${orderId}\n实付金额: 正在计算...\n\n点击"确定"模拟支付成功`);
  },

  // 6. 订单状态轮询 (用于 Detail 页同步)
  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    await delay(500);
    const statuses = [OrderStatus.PAID, OrderStatus.PREPARING, OrderStatus.READY];
    // 模拟状态演变（在演示中每次请求随机返回一个较高权重的状态）
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
};
