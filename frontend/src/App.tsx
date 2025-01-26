// src/App.tsx
import { ThemeProvider } from 'next-themes'
import Homepage from './page/Homepage'

function App() {
  

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
      <Homepage />
      {/* <TestComponent2/> */}
    </ThemeProvider>
  )
}

export default App