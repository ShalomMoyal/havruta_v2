"use client"

import { api } from '~/trpc/react'
import { UserBadge } from "~/hooks/user-badge"
import { ModalFormComponent } from "~/components/modal-form"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchIcon, MenuIcon, XIcon } from 'lucide-react'
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

export function WebAppNavbarComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 bg-background shadow-sm transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-4xl font-bold text-primary">חברותא</Link>
            </div>
           
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <ModalFormComponent />
            <UserBadge />
            <Button variant="outline" onClick={() => window.location.href = '/account'}>Sign In</Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button onClick={() => setIsSheetOpen(true)}>Login</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Login</SheetTitle>
                  <SheetDescription>
                    Enter your credentials to log in to your account.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input id="email" placeholder="Email" className="col-span-4" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input id="password" type="password" placeholder="Password" className="col-span-4" />
                  </div>
                  <Button className="w-full" onClick={() => setIsSheetOpen(false)}>Login</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
         
          <div className="pt-4 pb-3 border-t border-input">
            <div className="px-2 space-y-1">
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Input
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                />
              </div>
              <ModalFormComponent />
              <UserBadge />
              <Button variant="outline" className="w-full justify-center">Sign In</Button>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="w-full justify-center mt-2">Login</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Login</SheetTitle>
                    <SheetDescription>
                      Enter your credentials to log in to your account.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input id="email-mobile" placeholder="Email" className="col-span-4" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input id="password-mobile" type="password" placeholder="Password" className="col-span-4" />
                    </div>
                    <Button className="w-full" onClick={() => setIsSheetOpen(false)}>Login</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}