# Rang Mohor — Wedding Return Gifts E-commerce (Frontend MVP)

## Original Problem Statement
Build a modern, premium, fully responsive e-commerce website for a brand that sells Wedding Return Gifts. Stack: React + Tailwind + Framer Motion + React Router. Theme: elegant, luxurious, minimal. Deliver 15 pages (Home, Shop, Product Details, Categories, About, Contact, Wishlist, Cart, Checkout, Login/Register, User Profile, Order History, FAQ, Privacy, Terms).

## User Choices (2026-02-26)
- Frontend-only demo (no backend, no real payment)
- Attractive, luxurious UI with animations
- Unsplash/Pexels images
- Brand identity from uploaded PDF: **Rang Mohor** (pink #F53D82, peach #F9C8A5, cream #FFF8E7)

## Architecture
- React (CRA) + Tailwind + Framer Motion + React Router 7
- Global state: React Context (`AppContext.jsx`) persisted via localStorage under key `rangmohor_state_v1`
- 20 sample products + 10 categories in `/src/data/products.js`
- Typography: Playfair Display (serif) + Outfit (body) + Cormorant Garamond (script accents)
- Shadcn/ui + Sonner toasts

## User Personas
- **Bride/groom**: browsing curated hampers for wedding guests
- **Gift buyer**: seasonal/festival gifting (Diwali, Rakhi)
- **Event planner**: bulk orders (referred to Contact)

## Core Requirements (static)
15 pages, sticky glass header, hero, categories, featured products, product detail with zoom+gallery+reviews, cart with coupon, checkout with 3 delivery + 3 payment options, wishlist, mock auth, order history, filters (category/price/rating), sort, pagination, dark mode, mobile drawer, animations everywhere.

## Implemented (2026-02-26)
- All 15 pages built + routed
- Sticky header with search, dark mode, wishlist/cart badges
- Hero, bento categories, featured grid, editorial split, bestsellers, testimonial
- Product detail: cursor-tracking image zoom, thumbnails, qty selector, reviews, related products
- Cart with coupons MOHOR10/LOVE20/WEDDING15, order summary, shipping calc
- Checkout with 3 delivery options (Standard/Express/White-Glove) and 3 payment methods
- Mock auth (login/register/forgot) with localStorage persistence
- Profile with tabs (Profile/Orders/Wishlist/Addresses) + address CRUD
- FAQ accordion, Privacy, Terms
- Dark mode toggle with class strategy, persists across reload
- Framer Motion page transitions, staggered product reveals, hover lifts

## Backlog / P1 (deferred)
- P1: Real backend (FastAPI + MongoDB) — auth, cart, orders persistence per user
- P1: Real payment (Stripe/Razorpay)
- P1: Admin panel to add/edit products
- P2: Product image gallery per SKU (currently 2-3 images reused)
- P2: Live inventory / stock indicator
- P2: Guest checkout email confirmation
- P2: SEO metatags per product page (react-helmet)
- P2: Instagram feed integration on Home

## Test Credentials
Mock — any email + password logs in. Sample: demo@rangmohor.com / pass1234
