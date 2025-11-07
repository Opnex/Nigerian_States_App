const BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

export async function signup(payload){
  const res = await fetch(`${BASE}/api/signup`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if(!res.ok) throw data
  return data
}

export async function login(payload){
  const res = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  if(!res.ok) throw data
  return data
}

export async function fetchStates(){
  const res = await fetch(`${BASE}/api/states`)
  const data = await res.json()
  if(!res.ok) throw data
  return data.states || []
}

export default { signup, login, fetchStates }
