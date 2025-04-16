'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { LogOut, LogIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session actuelle:', session)
        setIsLoggedIn(!!session)
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
        setIsLoggedIn(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Changement d\'état d\'authentification:', event, session)
      setIsLoggedIn(!!session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setIsLoggedIn(false)
      
      if (pathname !== '/') {
        router.push('/')
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  console.log('État actuel de isLoggedIn:', isLoggedIn)

  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.button
          key="logout"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="flex items-center gap-2 bg-primary text-white hover:bg-primary-dark font-medium py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Déconnexion
        </motion.button>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-primary text-white hover:bg-primary-dark font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <LogIn className="h-4 w-4" />
            Connexion
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 