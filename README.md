# ShopView — Product Dashboard

A modern, production-quality React application featuring authentication, protected routing, product browsing with pagination, and a full user profile — all powered by the [DummyJSON API](https://dummyjson.com).

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Authentication** | Login with username/password via DummyJSON auth endpoint |
| **Protected Routes** | Unauthenticated users are redirected to `/login` |
| **User Profile** | Logged-in user can view their own complete profile |
| **Products List** | Paginated grid (12 per page) with ratings, discounts, stock |
| **Product Detail** | Full product info with image gallery and customer reviews |
| **Persistent Session** | Token and user info stored in `localStorage` |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Form Validation** | Client-side field validation + API error handling |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopview-app.git
cd shopview-app

# 2. Install dependencies
npm install

# 3. Copy the sample env file
cp .env .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔐 Test Credentials

| Field | Value |
|---|---|
| Username | `emilys` |
| Password | `emilyspass` |

---

## 🗂 Project Structure

```
shopview-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   └── ProtectedRoute.jsx  # Auth-guarded route wrapper
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state + login/logout
│   ├── pages/
│   │   ├── Login.jsx           # Login screen with validation
│   │   ├── Dashboard.jsx       # Layout shell with Navbar + Outlet
│   │   ├── Profile.jsx         # Logged-in user profile
│   │   ├── Products.jsx        # Paginated product grid
│   │   └── ProductDetail.jsx   # Full product details + reviews
│   ├── services/
│   │   └── api.js              # Axios API calls (auth, users, products)
│   ├── styles/
│   │   └── global.css          # Design system + component styles
│   ├── App.jsx                 # Root: AuthProvider + BrowserRouter + Routes
│   └── main.jsx
├── .env                        # Environment variables (not committed)
├── .env                # Sample env file
└── README.md
```

---

## 📄 Routes

| Route | Access | Description |
|---|---|---|
| `/login` | Public | Login screen |
| `/dashboard/products` | Protected | Paginated product list |
| `/dashboard/products/:id` | Protected | Product detail page |
| `/dashboard/profile` | Protected | Logged-in user profile |
| `/*` | Any | Redirects to `/login` |

---

## ⚙️ Environment Variables (.env)

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_AUTH_ENDPOINT=/auth/login
VITE_PRODUCTS_ENDPOINT=/products
VITE_USERS_ENDPOINT=/users
```

---

## 🔑 Auth Flow

1. User submits credentials on `/login`
2. POST to `https://dummyjson.com/auth/login`
3. `accessToken` + user info saved to `localStorage`
4. Axios interceptor injects `Bearer` token on all requests
5. `ProtectedRoute` redirects unauthenticated users to `/login`
6. Logout clears `localStorage` and redirects

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| React 18 | UI library |
| Vite | Build tool |
| React Router v6 | Routing |
| Axios | HTTP client |
| DummyJSON | Mock REST API |

---

## 📦 Build

```bash
npm run build   # Outputs to dist/
npm run preview # Preview production build
```
