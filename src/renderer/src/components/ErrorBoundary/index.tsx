import React, { useState, useEffect } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo): void => {
      console.error(error, errorInfo)
      setHasError(true)
    }

    const errorListener = (event: ErrorEvent): void => {
      handleError(event.error, { componentStack: '' })
    }
    window.addEventListener('error', errorListener)

    return (): void => {
      window.removeEventListener('error', errorListener)
    }
  }, [])

  if (hasError) {
    return <h1 style={{ color: '#FFF' }}>Something went wrong.</h1>
  }

  return <>{children}</>
}

export default ErrorBoundary
