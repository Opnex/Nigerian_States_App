import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../Frontend/src/api'

export default function Signup(){
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setMsg(null)
    if(!email.includes('@')) return setMsg({type:'error', text:'Enter a valid email'})
    if(password.length < 6) return setMsg({type:'error', text:'Password must be at least 6 characters'})
    setLoading(true)
    try{
      await api.signup({ full_name: fullName, email, password })
      setMsg({type:'success', text:'Signup successful — redirecting to login...'})
      setTimeout(()=> nav('/login'), 1100)
    }catch(err){
      const text = (err && err.detail) ? err.detail : (err && err.message) ? err.message : 'Signup failed'
      setMsg({type:'error', text})
    }finally{setLoading(false)}
  }

  return (
    <div className='app-container'>
      <div className='form' style={{maxWidth:520, margin:'0 auto'}}>
        <h2>Create an account</h2>
        {msg && <div className={`message ${msg.type==='success'? 'success':'error'}`}>{msg.text}</div>}
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label className='label'>Full Name</label>
            <input className='input' value={fullName} onChange={e=>setFullName(e.target.value)} required />
          </div>
          <div className='input-group'>
            <label className='label'>Email</label>
            <input className='input' type='email' value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className='input-group'>
            <label className='label'>Password</label>
            <input className='input' type='password' value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button className='btn' disabled={loading}>{loading? 'Creating...':'Sign up'}</button>
            <Link to='/login' style={{marginLeft:12}}>Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
