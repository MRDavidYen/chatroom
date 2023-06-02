import type { AppProps } from 'next/app'
import ErrorBoundary from 'src/client/components/error'
import Layout from 'src/client/components/layout'
import { ErrorBoundaryProvider } from 'src/client/contexts/error'
import 'src/styles/globals.css'
import 'highlight.js/styles/github-dark.css'
import { ChatProvider } from 'src/client/contexts/chat'
import { ModelsProvider } from 'src/client/contexts/models'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundaryProvider>
      <ChatProvider>
        <ModelsProvider>
          <ErrorBoundary>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorBoundary>
        </ModelsProvider>
      </ChatProvider>
    </ErrorBoundaryProvider>
  )
}

export default MyApp
