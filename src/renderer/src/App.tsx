import ErrorBoundary from '@components/ErrorBoundary'
import Router from './Router'

// http://localhost:5173/

function App(): JSX.Element {
  return (
    <>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  )
}

export default App
