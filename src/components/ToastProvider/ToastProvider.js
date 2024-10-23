import React from 'react';

import useKeydown from '../../hooks/useKeyDown';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([]);

  const handleKeyDown = React.useCallback(() => {
    setToasts([])
  }, [])

  useKeydown('Escape', handleKeyDown);
  useKeydown('Space', () => console.log('aaa'));
  useKeydown('ArrowLeft', () => console.log('bbb'));

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts, 
      { id: crypto.randomUUID(), 
        message, 
        variant 
      }
    ];
    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter(toast => toast.id !== id);
    setToasts(nextToasts);
  }


  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast}}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;