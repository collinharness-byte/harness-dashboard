import { useEffect, useRef, useState } from 'react'
import './AccountActions.css'

function Icon({ name }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{name === 'bell' ? <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></> : <><circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/></>}</svg>
}

export default function AccountActions({ role, announcements, account, onSave, onLogout }) {
  const [open, setOpen] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [error, setError] = useState('')
  const root = useRef(null)
  const trigger = useRef(null)
  const modal = useRef(null)
  useEffect(() => {
    const close = e => { if (!root.current?.contains(e.target)) setOpen(null) }
    const escape = e => { if (e.key === 'Escape') { setOpen(null); setDialog(null); trigger.current?.focus() } }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) }
  }, [])
  useEffect(() => { if (dialog) modal.current?.querySelector('input, button')?.focus() }, [dialog])
  function show(name) { setOpen(null); setError(''); setDialog(name) }
  function closeDialog() { setDialog(null); trigger.current?.focus() }
  function trapFocus(e) {
    if (e.key !== 'Tab') return
    const items = [...modal.current.querySelectorAll('button, input, a[href]')]
    const first = items[0], last = items.at(-1)
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  return <div className="account-actions" ref={root}>
    <div className="header-popover-anchor">
      <button className="header-icon-button" aria-label="Latest announcements" aria-expanded={open === 'announcements'} aria-controls="latest-announcements" onClick={() => setOpen(open === 'announcements' ? null : 'announcements')}><Icon name="bell"/>{announcements.length > 0 && <span className="notification-count">{announcements.length}</span>}</button>
      {open === 'announcements' && <section className="header-popover announcement-popover" id="latest-announcements" aria-label="Latest announcements"><div className="popover-heading"><b>Latest announcements</b><small>{announcements.length} updates</small></div>{announcements.length ? announcements.slice().reverse().slice(0,5).map(n => <article key={n.id}><small>{n.audience}{n.createdAt ? ` · ${new Date(n.createdAt).toLocaleDateString()}` : ''}</small><h3>{n.title}</h3><p>{n.body}</p></article>) : <p className="popover-empty">No announcements available for your current tour.</p>}</section>}
    </div>
    <div className="header-popover-anchor">
      <button ref={trigger} className="header-icon-button profile-trigger" aria-label="User account menu" aria-expanded={open === 'account'} aria-controls="user-account-menu" onClick={() => setOpen(open === 'account' ? null : 'account')}><Icon name="user"/></button>
      {open === 'account' && <section className="header-popover account-popover" id="user-account-menu" aria-label="User account"><div className="popover-heading"><b>{account.name || 'Your account'}</b><small>{account.email || role}</small></div><button onClick={() => show('account')}>Edit account information</button><a href="#customer-support" onClick={e => { e.preventDefault(); show('support') }}>Customer support</a><a className="logout-link" href="#logout" onClick={e => { e.preventDefault(); setOpen(null); onLogout() }}>Log out</a></section>}
    </div>
    {dialog && <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) closeDialog() }}><section className="modal account-dialog" ref={modal} role="dialog" aria-modal="true" aria-labelledby="account-dialog-title" onKeyDown={trapFocus}><div className="panel-title"><h2 id="account-dialog-title">{dialog === 'account' ? 'Account information' : 'Customer support'}</h2><button aria-label="Close account dialog" onClick={closeDialog}>×</button></div>{dialog === 'account' ? <form onSubmit={e => { e.preventDefault(); const values = Object.fromEntries(new FormData(e.currentTarget)); try { onSave(values); closeDialog() } catch (err) { setError(err.message) } }}><p className="muted">Your {role.toLowerCase()} account details are saved in this browser. Worker qualifications and availability are managed in the worker profile.</p>{error && <p role="alert">{error}</p>}<label>Account full name<input name="name" defaultValue={account.name} autoComplete="name" required/></label><label>Account email<input name="email" type="email" defaultValue={account.email} autoComplete="email" required/></label><label>Phone number<input name="phone" type="tel" defaultValue={account.phone || ''} autoComplete="tel"/></label><label>Company / organization<input name="company" defaultValue={account.company || ''} autoComplete="organization"/></label><div className="form-actions"><button type="button" onClick={closeDialog}>Cancel</button><button type="submit" className="primary">Save account</button></div></form> : <div className="support-content"><p>Need help using Tourline?</p><h3>Tour planning</h3><p>Use Tour stops to edit venues, logistics, schedules, and daily tasks.</p><h3>Jobs and staffing</h3><p>Workers apply for jobs, managers approve applications, and workers confirm assignments. Open shifts require preapproval and matching qualifications.</p><h3>Report a problem</h3><p>Send the app owner the steps you took, what you expected, and the error you saw. Avoid including sensitive account information.</p><p className="muted">Live support is not connected yet. A support contact will be added when the service is configured.</p><button className="primary" onClick={closeDialog}>Done</button></div>}</section></div>}
  </div>
}
