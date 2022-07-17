import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
}

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
    </div>
  )
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>{children}</BrowserRouter>
      </ErrorBoundary>
    </React.Suspense>
  )
}
