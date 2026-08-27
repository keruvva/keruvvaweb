interface RequestBody {
  email?: unknown
  organizationRole?: unknown
}

interface VercelRequest {
  method?: string
  body?: RequestBody
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void
  status: (code: number) => VercelResponse
  json: (body: Record<string, string>) => VercelResponse
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const organizationRole = typeof request.body?.organizationRole === 'string' ? request.body.organizationRole.trim() : ''
  if (!emailPattern.test(email) || email.length > 254 || organizationRole.length > 200) return response.status(400).json({ error: 'Invalid form data' })

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) return response.status(503).json({ error: 'Form service is not configured' })

  const headers = { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` }
  const existing = await fetch(`${supabaseUrl}/rest/v1/early_access_submissions?select=id&email=eq.${encodeURIComponent(email)}&limit=1`, { headers }).catch(() => null)
  if (!existing?.ok) return response.status(502).json({ error: 'Could not check registration status' })
  const existingRows = await existing.json() as unknown
  if (Array.isArray(existingRows) && existingRows.length > 0) return response.status(409).json({ status: 'duplicate', error: 'You have already registered.' })

  const result = await fetch(`${supabaseUrl}/rest/v1/early_access_submissions`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ email, organization_role: organizationRole || null })
  }).catch(() => null)
  if (result?.status === 409) return response.status(409).json({ status: 'duplicate', error: 'You have already registered.' })
  if (!result?.ok) {
    const details = await result?.text().catch(() => '') ?? ''
    let message = 'Could not save form data'
    if (details.includes('early_access_submissions')) message = 'The early_access_submissions table was not found. Run supabase/early-access.sql first.'
    else if (result?.status === 401 || result?.status === 403) message = 'Supabase rejected the service key. Check SUPABASE_SERVICE_ROLE_KEY in Vercel.'
    else if (result) message = `Supabase rejected the request (${result.status}). Check the table schema and Supabase URL.`
    return response.status(502).json({ error: message })
  }
  return response.status(200).json({ status: 'received' })
}