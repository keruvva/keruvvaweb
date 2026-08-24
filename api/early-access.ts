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

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) return response.status(503).json({ error: 'Form service is not configured' })

  const result = await fetch(`${supabaseUrl}/rest/v1/early_access_submissions`, {
    method: 'POST',
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ email, organization_role: organizationRole || null })
  }).catch(() => null)
  if (!result?.ok) return response.status(502).json({ error: 'Could not save form data' })
  return response.status(200).json({ status: 'received' })
}