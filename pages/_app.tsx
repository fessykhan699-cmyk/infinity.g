
import React from 'react';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';

/**
 * Standard Next.js _app implementation.
 * Wraps every page in the MainLayout to ensure the BackgroundVideo
 * doesn't re-mount on internal route changes.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
