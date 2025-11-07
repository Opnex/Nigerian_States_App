import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../Frontend/src/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    try{
      const data = await api.login({ email, password })
      // backend returns user object, store in localStorage
      if(data && data.user){
        localStorage.setItem('user', JSON.stringify(data.user))
        nav('/dashboard')
      }else{
        setMsg({type:'error', text:'Invalid response from server'})
      }
    }catch(err){
      const text = (err && err.detail) ? err.detail : (err && err.message) ? err.message : 'Login failed'
      setMsg({type:'error', text})
    }finally{setLoading(false)}
  }

  return (
    <div className='app-container'>
      <div className='form' style={{maxWidth:520, margin:'0 auto'}}>
        <h2>Sign in</h2>
        {msg && <div className={`message ${msg.type==='success'? 'success':'error'}`}>{msg.text}</div>}
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label className='label'>Email</label>
            <input className='input' type='email' value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className='input-group'>
            <label className='label'>Password</label>
            <input className='input' type='password' value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button className='btn' disabled={loading}>{loading? 'Signing in...':'Sign in'}</button>
            <Link to='/' style={{marginLeft:12}}>Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
