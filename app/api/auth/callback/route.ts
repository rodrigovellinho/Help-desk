import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  const code = url.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(url.origin)

  if (!code) {
  }
}
