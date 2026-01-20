
import { StoreContext, Product, Order, OrderStatus } from './types';
import { MERCHANTS, PRODUCTS_MOCK } from './config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // 1. 解析场景码 (GET /context/resolve?scene_code=...)
  async resolveContext(sceneCode: string): Promise<StoreContext> {
    await delay(600);
    const m = MERCHANTS[0]; // 默认取第一个做演示
    return {
      id: m.id,
      name: m.name,
      table_no: sceneCode.includes('TABLE') ? 'A12' : undefined,
      allow_order: m.features.dineIn, // 映射是否允许下单
      allow_pay: true,
      address: '深圳市南山区粤海街道软件产业基地',
      order_type_default: sceneCode.includes('TABLE') ? 'DINE_IN' : 'PICK_UP',
      theme: {
        primary: m.theme.primary,
        secondary: m.theme.secondary
      }
    };
  },

  // 2. 获取菜单 (GET /menu?store_id=...)
  async getMenu(storeId: string): Promise<Product[]> {
    await delay(500);
    return PRODUCTS_MOCK[storeId] || PRODUCTS_MOCK['TX1'];
  },

  // 3. 试算 (POST /cart/price)
  async calculatePrice(items: any[]): Promise<{ total: number; discount: number }> {
    await delay(300);
    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    return { total, discount: 0 };
  },

  // 4. 下单 (POST /orders)
  async createOrder(data: any): Promise<Order> {
    await delay(800);
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

  // 5. 支付参数与执行 (POST /pay/wechat/jsapi)
  async requestPayment(orderId: string): Promise<boolean> {
    console.log(`[JSAPI] 正在请求订单 ${orderId} 的支付参数...`);
    await delay(1200);
    // 模拟微信支付弹窗确认
    return window.confirm(`微信支付模拟: \n订单号: ${orderId}\n是否确认支付?`);
  },

  // 6. 订单状态查询 (用于轮询)
  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    await delay(400);
    return OrderStatus.PAID;
  }
};
