import { Suspense } from 'react'
import TicketsList from './TicketsList'
import Loading from '../loading'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Tickets',
}

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketsList />
      </Suspense>
    </main>
  )
}
