# 棠小一烘焙 (Tang Xiao Yi) · SaaS Digital Dining Engine

[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SaaS](https://img.shields.io/badge/Architecture-SaaS--Ready-00C7B7.svg?style=flat-square)](#)
[![Design](https://img.shields.io/badge/UI/UX-High--Fidelity-FFD700.svg?style=flat-square)](#)

A world-class, 1:1 commercial-grade SaaS ordering solution for the modern F&B industry. This project transcends a simple template; it is a **universal frontend engine** designed for multi-tenant scalability, high-fidelity interaction, and deep hardware integration.

---

## 💎 Design Philosophy: "Physicality & Precision"

The UI is engineered to bridge the gap between web and native applications, following the **"Apple-esque"** aesthetic principles:

- **Dynamic Theming**: All components utilize CSS Custom Properties (Variables) injected via the SaaS configuration layer, enabling instant brand switching (e.g., `#f7e28b` for Bakery, `#2D5A27` for Coffee).
- **Tactile Feedback**: Every interactive element features the `active-scale` micro-animation, providing users with instant physical confirmation of their input.
- **Organic Geometry**: Utilizing large-radius containers (`48px`) and multi-layered soft shadows (`shadow-soft`) to create a floating, modern card-based interface.
- **Typography as Identity**: High-contrast font weights (`font-black`) paired with wide letter spacing (`tracking-widest`) establish a premium, luxury brand voice.

---

## 🚀 SaaS Core Capabilities

### 1. Multi-Tenant Architecture
- **Tenant Context Isolation**: The system resolves `store_context` via a `scene_code` (QR scan), automatically re-skinning the entire UI and mapping API endpoints to specific merchant IDs.
- **Cart Namespace Protection**: Shopping carts are persisted locally using merchant-specific namespaces (`cart_{merchant_id}`), preventing cross-store data leakage.

### 2. Business Logic Versatility
- **Hybrid Service Modes**: Supports "Dine-in (Table Scan)", "Self-Pickup", "Local Delivery", and "Express Shipping" within a single codebase.
- **Store-State Intelligence**: Real-time checking of store operational status (`OPEN`, `REST`, `CLOSED`) with automatic UI fallback (disabling checkout, displaying banners).

---

## ✨ Features & Modules

### 🛒 High-Precision Ordering
- **Smooth Navigation**: Categorized menu with sticky headers and scroll-sync.
- **Specification Engine**: Simulated support for complex SKU options (Size, Temp, Sugar).
- **Smart Checkout**: Fee calculation logic with support for VIP pricing and merchant-specific discounts.

### 💳 Transactional Integrity
- **Mock Payment Flow**: Simulated `wx.requestPayment` integration with JSAPI logic.
- **Order Tracking**: Real-time status polling using **Exponential Backoff** (1s -> 2s -> 4s -> 5s) to sync payment results efficiently.
- **取餐号 (Take-No) System**: Automated generation of digital queue numbers for offline pickup.

### 👤 Advanced Membership System
- **Dynamic QR Identity**: A membership code center that auto-refreshes every 60 seconds to prevent unauthorized scanning.
- **Hardware Integration**: Built-in support for **Camera Access** to capture user avatars directly within the app.
- **Wallet & Points**: Full lifecycle management of user balance, integral points, and digital coupons with high-fidelity ticket aesthetics.

---

## 📂 Engineering Structure

```text
├── App.tsx             # Universal Router & SaaS Global Layout
├── api.ts              # Abstracted Service Layer with Mock Latency
├── types.ts            # Type-Safe Entity Definitions (Merchants, Orders)
├── config.ts           # Centralized SaaS Tenant Mock Data
├── pages/
│   ├── Menu.tsx        # High-Performance Catalog & Cart Logic
│   ├── Entry.tsx       # QR Scene Resolution Entry Point
│   ├── MemberCode.tsx  # Dynamic Security Code Generator
│   ├── TopUp.tsx       # Financial Marketing Loop (Balance Recharge)
│   └── ...             # Extended Business Modules (Address, UserInfo)
```

---

## 🛠 Tech Stack

- **React 19**: Leveraging the latest concurrent features and hooks for state management.
- **Tailwind CSS**: The backbone of our SaaS dynamic styling engine.
- **Lucide React**: Crisp, pixel-perfect vector icons for the entire F&B journey.
- **Local Storage API**: Used as a local database to simulate persistent server-side state.

---

## 🎯 Our Vision

> "Build for the scale of SaaS, design for the soul of the Brand."

This solution is built to be **"Plug-and-Play"**. Whether it's a high-end French patisserie or a global tea chain, our engine adapts instantly through a simple JSON configuration change, delivering a boutique digital experience at scale.

---
*© 2025 SaaS F&B Digital Research Group. All Rights Reserved.*