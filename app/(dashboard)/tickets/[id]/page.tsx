import { notFound } from 'next/navigation'
import { Tickets } from '../TicketsList'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import DeleteButton from './DeleteButton'

export const dynamicParams = true

export async function generateMetadata({ params }: TicketDetailProps) {
  const supabase = createServerComponentClient({ cookies })

  const { data: ticket } = await supabase
    .from('tickets')
    .select()
    .eq('id', params.id)
    .single()

  return {
    title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not found'} `,
  }
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.from('tickets').select().eq('id', id).single()

  if (!data) {
    notFound()
  }

  return data
}

interface TicketDetailProps {
  params: {
    id: string
  }
}

export default async function TicketDetail({ params }: TicketDetailProps) {
  const ticket = await getTicket(params.id)

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <main>
      <nav>
        <h2>Tickets Details</h2>
        <div className="ml-auto">
          {data.session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by{ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
