import React from 'react';
import { SearchInterface } from '@/common/SearchInterface';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon} from 'lucide-react';
import { useTheme } from 'next-themes';
import Lottie from 'react-lottie';
import animationData from '@/assets/bgdot.json'; 

function Homepage() {
  const { theme, setTheme } = useTheme();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 opacity-50">
        <Lottie options={lottieOptions} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/90 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex  items-center space-x-3"
            >
              <motion.div 
    whileHover={{ rotate: 360, scale: 1.05 }}
    transition={{ 
      duration: 0.5,
      ease: "easeInOut"
    }}
    className="relative h-10 w-10 rounded-xl shadow-lg flex items-center justify-center overflow-hidden group"
    style={{
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--destructive) 100%)'
    }}
  >
    {/* Background effects */}
    <div className="absolute inset-0 opacity-50 blur-sm" 
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--destructive) 100%)'
      }}
    />
    
    {/* Main Q shape */}
    <div className="relative w-7 h-7 rounded-full border-[3px] flex items-center justify-center
      border-background dark:border-white"
    >
      {/* Inner circle with adaptive colors */}
      <div className="w-4 h-4 rounded-full 
        bg-background dark:bg-white
        opacity-90"
      />
      
      {/* Tail of Q */}
      <div className="absolute bottom-[-3px] right-[-3px] w-3 h-3 
        bg-background dark:bg-white
        transform rotate-45"
      />
    </div>
    
    {/* Shine effect */}
    <div className="absolute top-0 left-0 w-full h-full 
      bg-gradient-to-br from-white/20 to-transparent 
      opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
    />
  </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-destructive [background-clip:text] [-webkit-background-clip:text] text-foreground">
                SpeakQ
              </span>
            </motion.div>

            {/* Navigation Links and Theme Toggle */}
            <div className="flex items-center space-x-6">
              <motion.div className="flex space-x-4">
                {['Home', 'Features', 'Pricing'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="hidden md:block text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>

              {/* Theme and Social Icons */}
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>

                
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              
            >
              <span className=" text-4xl bg-gradient-to-r from-primary to-destructive [background-clip:text] [-webkit-background-clip:text] text-foreground">
                Master Your Knowledge with SpeakQ
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore our vast collection of carefully curated MCQs and Anagrams. 
              Perfect for students, professionals, and knowledge enthusiasts.
            </motion.p>
          </div>

          {/* Search Interface */}
          <motion.div 
            className="rounded-2xl shadow-2xl backdrop-blur-lg bg-background/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SearchInterface />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2024 SpeakQ. All rights reserved. Designed By <a target='_blank' href="https://www.priyanshujha.tech" className="hover:text-primary">Priyanshu Jha</a>
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              {['About', 'Privacy', 'Terms'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;