import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux"
import store, { persistor } from "./redux/store"

export const queryClient = new QueryClient({})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" font-sans">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </PersistGate>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
