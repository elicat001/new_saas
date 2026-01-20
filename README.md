# 棠小一烘焙 (Tang Xiao Yi) · SaaS Digital Dining Engine

[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![SaaS](https://img.shields.io/badge/Architecture-SaaS--Ready-00C7B7.svg?style=flat-square)](#)

这是一个高保真、商业级的 **To-C 扫码点餐系统 V1** 解决方案。本项目采用 SaaS 架构设计，支持多门店动态配置、扫码上下文识别、微信支付闭环及实时订单追踪。

---

## 💎 设计理念：物理感与精准度

本系统的 UI 设计旨在缩小 Web 与原生小程序的体验差距，遵循 **"Apple-esque"** 美学原则：

- **动态主题注入**：所有组件通过 SaaS 配置层注入 CSS 变量（`--brand-primary` 等），实现秒级换肤。
- **触觉反馈**：核心交互元素集成 `active-scale` 微动效，提供真实的物理反馈。
- **有机几何学**：采用 `48px` 大圆角容器与 `shadow-soft` 多层软阴影，构建漂浮感界面。
- **门店状态感知**：实时识别门店 `OPEN/REST/CLOSED` 状态，自动降级 UI 交互。

---

## 🚀 核心业务流程 (To-C V1)

### 1. 扫码上下文 (Store Context)
系统启动后通过 `scene_code` 解析门店与桌号信息：
- **STORE 码**：默认开启“到店自取”模式。
- **TABLE 码**：自动绑定桌号，开启“堂食”模式。
- **门店隔离**：购物车数据按 `store_id` 进行命名空间隔离，防止跨店数据干扰。

### 2. 点单与加购
- **高效分类导航**：左侧分类滚动同步，右侧商品流式布局。
- **购物车算价**：前端实时计算，后端接口二次校验。

### 3. 支付与交付闭环
- **模拟 JSAPI 支付**：集成微信支付弹窗模拟流程。
- **指数退避轮询**：支付后自动启动订单状态同步（1s -> 2s -> 4s -> 5s），确保最终一致性。
- **取餐号系统**：支付成功后自动分发 B/C 头的数字取餐凭证。

---

## 📂 工程结构

```text
├── App.tsx             # 全局路由与 SaaS 上下文管理
├── api.ts              # 抽象 Service 层（适配微信小程序/Web）
├── main.py             # FastAPI 后端服务（数据持久化与业务逻辑）
├── types.ts            # 类型定义（MerchantConfig, OrderStatus, etc.）
├── config.ts           # 静态 SaaS 租户 Mock 配置
├── pages/
│   ├── Entry.tsx       # 扫码入口解析页
│   ├── Menu.tsx        # 核心菜单与购物车浮层
│   ├── Checkout.tsx    # 订单确认与支付发起
│   ├── OrderDetail.tsx # 实时状态追踪与取餐号展示
│   ├── MemberCode.tsx  # 动态会员权益码（60s 自动刷新）
│   └── UserInfo.tsx    # 硬件集成：原生相机调用更新头像
```

---

## 🛠 技术实现细节

- **小程序级状态管理**：采用持久化存储模拟小程序 `wx.setStorageSync` 逻辑，确保冷启动状态不丢失。
- **硬件集成**：在 `UserInfo` 页面通过 `getUserMedia` 实现高保真拍照取景器。
- **支付安全性**：在 `Checkout` 页面模拟支付环境加密保护提示，提升用户信任感。
- **轮询策略**：`OrderDetail` 内置自动状态同步引擎，处理支付回调延迟。

---

## 📡 API 契约说明

| 路径 | 方法 | 说明 |
| :--- | :--- | :--- |
| `/api/merchants` | GET | 获取所有 SaaS 租户配置 |
| `/api/context/resolve` | GET | 解析扫码 Scene 码获取门店上下文 |
| `/api/merchants/{id}/menu` | GET | 拉取指定门店的菜单数据 |
| `/api/orders` | POST | 创建订单并进入待支付状态 |
| `/api/pay/wechat/jsapi` | POST | 模拟获取微信支付签名参数 |

---

## 🎯 愿景

> "为 SaaS 的规模化而构建，为品牌的灵魂而设计。"

本方案可直接作为生产环境的原型，只需通过简单的 JSON 配置更改，即可适配从高端烘焙到全球连锁咖啡店的数字化点餐需求。

---
*© 2025 SaaS F&B Digital Research Group. All Rights Reserved.*