import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Import components based on the current page
async function renderApp() {
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('popup.html')) {
    const { default: Popup } = await import('./components/Popup');
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Popup />
      </React.StrictMode>
    );
  } else if (currentPath.includes('options.html')) {
    const { default: Options } = await import('./components/Options');
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Options />
      </React.StrictMode>
    );
  } else if (currentPath.includes('blocked.html')) {
    const { default: Blocked } = await import('./components/Blocked');
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Blocked />
      </React.StrictMode>
    );
  }
}

renderApp();