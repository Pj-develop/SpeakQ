// src/App.tsx
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Homepage from './page/Homepage'
import TestComponent2 from './proto/TestComponent2'

function App() {
  

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
      <Homepage />
      {/* <TestComponent2/> */}
    </ThemeProvider>
  )
}

export default App