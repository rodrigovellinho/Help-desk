import Image from 'next/image'
import Logo from './dojo-logo.png'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import LogoutButton from './LogoutButton'

interface NavbarProps {
  user?: User
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Dojo Helpdesk logo"
        width={70}
        placeholder="blur"
        quality={100}
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  )
}
