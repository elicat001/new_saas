
# 棠小一烘焙 (Tang Xiao Yi Baking) 
### 商业级通用型 SaaS 点餐系统前端解决方案

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-skyblue.svg)](https://tailwindcss.com/)
[![SaaS](https://img.shields.io/badge/Architecture-SaaS--Ready-green.svg)](#)
[![Design](https://img.shields.io/badge/UI/UX-High--Fidelity-gold.svg)](#)

这是一个 1:1 深度还原的商业级 F&B (餐饮) 点餐小程序前端应用。本项目不仅是一个点餐模板，更是一个 **通用型 SaaS 前端引擎**。虽然演示以“棠小一烘焙”为品牌背景，但其底层逻辑支持不同商家、不同门店的灵活接入与个性化视觉装修。

---

## 🚀 SaaS 核心能力

### 1. 多租户品牌适配 (Multi-tenant Branding)
- **通用组件库**：所有 UI 组件（按钮、卡片、导航）均基于原子化 CSS 构建，支持通过配置中心快速调整品牌色（如：`--brand-yellow`）、圆角弧度及字体风格。
- **动态装修能力**：系统架构设计预留了配置接口，支持商家自主上传 Logo、Banner、商品分类及配色方案，实现“千店千面”的视觉效果。

### 2. 跨业态兼容性 (General-Purpose Engine)
- **多模式点餐**：内置“扫码点餐（堂食）”、“到店自取（外带）”、“同城配送”及“全国快递”四种业务流，适配烘焙、轻食、饮品等多种餐饮零售业态。
- **柔性布局**：采用高度灵活的 Grid 与 Flex 布局，确保商家在上传不同长宽比的商品图片或Banner时，页面依然保持极佳的平衡感。

---

## ✨ 核心特性

### 1. 极致视觉与交互 (Visual & UX)
- **高保真还原**：精密排版结合 `font-black` 强化品牌感，配合 `tracking-widest` 营造奢侈呼吸感。
- **iOS 级质感**：统一使用 `48px/32px` 大圆角容器与 `shadow-soft` 多层柔和投影，模拟原生 App 交互体验。
- **触觉反馈**：全局集成 `active-scale` 动效，为用户每一次点击提供真实的物理反馈。

### 2. 全链路业务覆盖
- **智能点餐**：含多规格选择弹窗、动态购物车逻辑、复杂的阶梯价格计算。
- **会员系统**：动态刷新会员码（含 60s 自动重载）、等级积分体系、复古票券样式的券包中心。
- **安全结算**：集成微信/支付宝/云闪付等多渠道支付视觉方案，以及内置的“余额充值”营销闭环。
- **硬件集成**：支持调用设备摄像头进行 **头像采集** 或 **扫码识读**，满足线下核销场景。

---

## 🛠 技术栈

- **框架**: React 19 (ES Modules)
- **样式**: Tailwind CSS (原子化设计，方便 SaaS 主题切换)
- **图标**: Lucide React (精细化矢量定义)
- **动画**: CSS3 Keyframes + Tailwind Transition
- **逻辑**: React Hooks + TypeScript

---

## 📂 架构概览

```text
├── App.tsx             # 核心路由与全局 SaaS 布局管理器
├── types.ts            # 通用数据实体定义（商家、商品、订单）
├── pages/
│   ├── Home.tsx        # 商家门户（支持动态 Banner 与功能入口）
│   ├── Menu.tsx        # 分类点餐引擎（支持多种展示模式）
│   ├── Orders.tsx      # 全渠道订单追踪
│   ├── Profile.tsx     # 会员中心（支持商家权益自定义）
│   └── ...             # 高级二级页面（结算、地址、充值等）
```

---

## 🎨 设计哲学

> "为通用而生，为品牌而精。"

本系统的开发初衷是打造一个 **“开箱即用”** 的商业闭环。我们不只关注单个页面的美观，更关注在 SaaS 环境下，代码的 **可复用性** 与 **可配置性**。无论是高端法式烘焙还是连锁茶饮，只需替换核心配置文件，即可瞬间变身为专属的品牌小程序。

---
*© 2025 SaaS 餐饮数字化研发团队. 保留所有设计权利。*
