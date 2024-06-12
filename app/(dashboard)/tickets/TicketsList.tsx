import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { cookies } from 'next/headers'

async function getTickets() {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase.from('tickets').select()

  if (error) {
    console.log(error.message)
  }

  return data
}

export type Tickets = {
  id: string
  title: string
  body: string
  priority: string
  user_email: string
}

export default async function TicketsList() {
  const tickets: Tickets[] | null = await getTickets()
  return (
    <>
      {tickets?.map(ticket => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}

      {tickets?.length === 0 && (
        <p className="text">There are no open tickets</p>
      )}
    </>
  )
}
