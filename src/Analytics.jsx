import { tourAnalytics } from './analytics'
import './Analytics.css'
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
export default function Analytics({ data, tourId }) {
  const metrics = tourAnalytics(data, tourId)
  return <>
    <div className="analytics-intro"><p>Selected tour · All saved records · Updates as your team works</p><span className="badge">Local workspace data</span></div>
    <div className="stats">
      <Metric label="Confirmed staffing" value={metrics.fillRate === null ? '—' : `${metrics.fillRate}%`} note={`${metrics.confirmed} confirmed / ${metrics.positions} positions`} />
      <Metric label="Open positions" value={metrics.vacancies} note={`${metrics.approved} approved, awaiting confirmation`} />
      <Metric label="Recorded merch sales" value={money(metrics.revenue)} note={`${metrics.units} units sold · USD`} />
      <Metric label="Tasks complete" value={metrics.taskCount ? `${Math.round(metrics.tasksDone / metrics.taskCount * 100)}%` : '—'} note={`${metrics.tasksDone} of ${metrics.taskCount} tasks completed`} />
    </div>
    <div className="two-col">
      <section className="panel"><div className="panel-title"><h2>Application pipeline</h2><span className="badge">{metrics.applicationCount} applications</span></div>
        {metrics.statusCounts.map(({status,count}) => <div className="analytics-bar-row" key={status}><div><span>{status}</span><b>{count}</b></div><progress aria-label={`${status} applications`} value={count} max={Math.max(1,metrics.applicationCount)} /></div>)}
        {!metrics.applicationCount && <p className="muted">Applications will appear here as employees apply for this tour.</p>}
      </section>
      <section className="panel"><h2>Merch snapshot</h2><div className="analytics-summary"><div><small>Units sold</small><strong>{metrics.units}</strong></div><div><small>Units in stock</small><strong>{metrics.inventory}</strong></div></div><p>Recorded sales reflect entries in Merch, before any taxes, expenses, refunds, or payment reconciliation.</p><p className="muted">Ticket revenue, profit, and payroll are not tracked yet.</p></section>
    </div>
    <section className="panel"><h2>Staffing by stop</h2><p>Tour-wide positions appear at every stop they cover. Stop totals should not be added together to calculate unique tour positions.</p>{metrics.stopStaffing.length ? <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th scope="col">Stop</th><th scope="col">Date</th><th scope="col">Positions</th><th scope="col">Confirmed</th><th scope="col">Awaiting confirmation</th><th scope="col">Open</th></tr></thead><tbody>{metrics.stopStaffing.map(s => <tr key={s.id}><th scope="row">{s.city}<small>{s.venue}</small></th><td>{s.date}</td><td>{s.positions}</td><td>{s.confirmed}</td><td>{s.approved}</td><td>{Math.max(0,s.positions-s.confirmed-s.approved)}</td></tr>)}</tbody></table></div> : <p className="empty">Add tour stops to see staffing coverage.</p>}</section>
    <section className="panel"><h2>Merch sales by product</h2>{metrics.products.length ? <div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th scope="col">Product</th><th scope="col">Units sold</th><th scope="col">Recorded sales</th></tr></thead><tbody>{metrics.products.map(p => <tr key={p.id}><th scope="row">{p.name}</th><td>{p.units}</td><td>{money(p.revenue)}</td></tr>)}</tbody></table></div> : <p className="empty">Record a sale in Merch to see product performance.</p>}</section>
  </>
}
function Metric({label,value,note}) { return <section className="stat"><span>{label}</span><strong>{value}</strong><small>{note}</small></section> }
