"use client"

import Link from "next/link"

import { useRouter } from "next/navigation"
import { routes } from "@/lib/route"

import { Menu, UserIcon, PlusIcon, CheckCheck, PlaneIcon, CarIcon, PercentIcon, User, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const router = useRouter()

  return (
    <header className='sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6'>
      <Button variant='outline' size='icon' className='md:hidden'>
        <Menu className='h-5 w-5' />
        <span className='sr-only'>Toggle menu</span>
      </Button>

      <div className='hidden md:flex md:flex-1 md:gap-10'>
        <nav className='flex items-center gap-6'>
          <Link href={routes.home} className='text-sm font-medium transition-colors hover:text-primary'>
            Dashboard
          </Link>
        </nav>
      </div>

      <div className='ml-auto flex items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' icon={PlusIcon}>
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-96'>
            <DropdownMenuItem onClick={() => router.push(routes.reservations.create)} className='flex gap-2 items-center'>
              <CheckCheck size={16} /> Reservation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.airportReservations.create)} className='flex gap-2 items-center'>
              <PlaneIcon size={16} /> Airport
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.carReservations.create)} className='flex gap-2 items-center'>
              <CarIcon size={16} /> Car
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.vouchers.create)} className='flex gap-2 items-center'>
              <PercentIcon size={16} /> Voucher
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.clients.index)} className='flex gap-2 items-center'>
              <User size={16} /> Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <UserIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-96'>
            <DropdownMenuItem className='flex gap-2 items-center'>
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
