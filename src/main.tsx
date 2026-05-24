import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Blog from './pages/Blog.tsx'
import BlogPost from './pages/BlogPost.tsx'
import Products from './pages/Products.tsx'
import ProductCategory from './pages/ProductCategory.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import Articles from './pages/Articles.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import FreebiePopup from './components/FreebiePopup.tsx'
import Download from './pages/Download.tsx'
import AdminDownloads from './pages/AdminDownloads.tsx'
import CheckoutSuccess from './pages/CheckoutSuccess.tsx'
import CheckoutCancel from './pages/CheckoutCancel.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <FreebiePopup />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/download" element={<Download />} />
        <Route path="/admin/downloads" element={<AdminDownloads />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
