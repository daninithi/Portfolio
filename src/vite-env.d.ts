import type React from 'react'

// Let JSX use the <spline-viewer> web component (loaded from a script in index.html).
// React 19 keeps JSX types under React.JSX, so we add it there.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string
      }
    }
  }
}
