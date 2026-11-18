import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/site.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// 构建产物里是预渲染好的 HTML，直接接管；开发模式下是空容器，正常渲染
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
