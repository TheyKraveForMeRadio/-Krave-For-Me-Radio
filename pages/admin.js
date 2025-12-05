import { useState } from 'react'
export default function Admin() {
  const [pass, setPass] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [links, setLinks] = useState([])

  function login() {
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASS) setAuthorized(true)
    else alert('Wrong pass. Set NEXT_PUBLIC_ADMIN_PASS in .env.local (this is basic protection).')
  }

  function addLink() {
    const url = prompt('Enter Stripe Payment Link URL for a mixtape product:')
    if (url) setLinks(l=>[...l,url])
  }

  return (
    <div style={{padding:24}}>
      <h1>Admin / Upload</h1>
      {!authorized ? (
        <div>
          <p>Enter admin pass:</p>
          <input value={pass} onChange={e=>setPass(e.target.value)} style={{padding:8}} />
          <button onClick={login} style={{marginLeft:8,padding:8,background:'#a200ff',color:'#fff'}}>Login</button>
        </div>
      ) : (
        <div>
          <p>Authorized. Use this page to manage placeholder Stripe links.</p>
          <button onClick={addLink} style={{padding:8,background:'#a200ff',color:'#fff'}}>Add Stripe Payment Link</button>
          <ul>
            {links.map((l,i)=>(<li key={i}><a href={l} target="_blank" rel="noreferrer">{l}</a></li>))}
          </ul>
          <p>Note: Replace with a proper DB in production.</p>
        </div>
      )}
    </div>
  )
}
