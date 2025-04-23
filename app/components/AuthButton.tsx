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
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session:', session)
        setIsLoggedIn(!!session)
        
        if (session) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
          
          console.log('User data:', userData)
          console.log('User error:', userError)
          
          if (userError) {
            console.error('Erreur lors de la récupération du rôle:', userError)
            setIsAdmin(false)
          } else {
            setIsAdmin(userData?.role === 'admin')
            console.log('Is admin:', userData?.role === 'admin')
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error)
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session)
      setIsLoggedIn(!!session)
      if (session) {
        checkSession()
      } else {
        setIsAdmin(false)
      }
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
      setIsAdmin(false)
      
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

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <div className="flex items-center gap-6">
      {isLoggedIn && (
        <>
          <Link 
            href="/admin/dashboard" 
            className={`transition-colors duration-300 ${
              isActive('/admin/dashboard') ? 'text-primary font-semibold' : 'text-text hover:text-primary'
            }`}
          >
            Dashboard
          </Link>
          {isAdmin && (
            <Link 
              href="/admin/files" 
              className={`transition-colors duration-300 ${
                isActive('/admin/files') ? 'text-primary font-semibold' : 'text-text hover:text-primary'
              }`}
            >
              Manager les fichiers
            </Link>
          )}
        </>
      )}
      <AnimatePresence>
        {isLoggedIn ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>{isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors duration-300"
            >
              <LogIn className="w-5 h-5" />
              <span>Connexion</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 