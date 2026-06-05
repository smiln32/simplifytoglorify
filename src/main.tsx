import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import ScrollToTop from './components/ScrollToTop.tsx'
import FreebiePopup from './components/FreebiePopup.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { Toaster } from './components/ui/sonner.tsx'

const App = lazy(() => import('./App.tsx'))
const Blog = lazy(() => import('./pages/Blog.tsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'))
const Products = lazy(() => import('./pages/Products.tsx'))
const ProductCategory = lazy(() => import('./pages/ProductCategory.tsx'))
const ArticlePage = lazy(() => import('./pages/ArticlePage.tsx'))
const Articles = lazy(() => import('./pages/Articles.tsx'))
const Download = lazy(() => import('./pages/Download.tsx'))
const AdminDownloads = lazy(() => import('./pages/AdminDownloads.tsx'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess.tsx'))
const CheckoutCancel = lazy(() => import('./pages/CheckoutCancel.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))
const ColorPreview = lazy(() => import('./pages/ColorPreview.tsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))
const Resources = lazy(() => import('./pages/Resources.tsx'))

function RouterContent() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />
      <FreebiePopup />
      <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/colors" element={<ColorPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <RouterContent />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
