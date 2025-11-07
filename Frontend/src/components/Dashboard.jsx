import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../Frontend/src/api'
import StateCard from './StateCard'

export default function Dashboard(){
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    let mounted = true
    api.fetchStates().then(list=>{ if(mounted){ setStates(list) } }).catch(e=>{ setError('Failed to fetch states')}).finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted = false
  },[])

  function logout(){
    localStorage.removeItem('user')
    nav('/login')
  }

  return (
    <div className='app-container'>
      <div className='topbar'>
        <h2>States Dashboard</h2>
        <div>
          <button className='logout' onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <div className='message error'>{error}</div>}
      {loading ? <div>Loading...</div> : (
        <div className='grid'>
          {states.map(s=> <StateCard key={s.id} state={s} />)}
        </div>
      )}
    </div>
  )
}
