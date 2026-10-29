export function tourAnalytics(data, tourId, now = new Date()) {
  const stops = data.stops.filter(s => s.tourId === tourId)
  const jobs = data.jobs.filter(j => j.tourId === tourId)
  const jobIds = new Set(jobs.map(j => j.id))
  const applications = data.applications.filter(a => jobIds.has(a.jobId))
  const tasks = data.tasks.filter(t => stops.some(s => s.id === t.stopId))
  const sales = (data.merchSales || []).filter(s => s.tourId === tourId)
  const confirmed = applications.filter(a => a.status === 'Confirmed').length
  const approved = applications.filter(a => a.status === 'Approved').length
  const positions = jobs.reduce((sum, j) => sum + Number(j.capacity), 0)
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)
  const windowEnd = new Date(`${today}T12:00:00Z`)
  windowEnd.setUTCDate(windowEnd.getUTCDate() + 6)
  const lastDay = windowEnd.toISOString().slice(0,10)
  const confirmedApplications = applications.filter(a => a.status === 'Confirmed')
  const totalWorkers = new Set(confirmedApplications.map(a => a.workerId || a.email?.trim().toLowerCase()).filter(Boolean)).size
  const upcomingShifts = confirmedApplications.reduce((sum, a) => {
    const job = jobs.find(j => j.id === a.jobId)
    return sum + stops.filter(s => (job.scope === 'Tour-wide' || s.id === job.scope) && s.date >= today && s.date <= lastDay).length
  }, 0)
  const products = new Map()
  for (const sale of sales) {
    const product = products.get(sale.itemId) || { id: sale.itemId, name: sale.name, units: 0, revenue: 0 }
    product.units += sale.quantity
    product.revenue += Math.round(sale.total * 100)
    products.set(sale.itemId, product)
  }
  return {
    stops, positions, confirmed, approved, totalWorkers, upcomingShifts,
    pendingApplications: applications.filter(a => a.status === 'Applied').length,
    shiftWindow: {start:today,end:lastDay},
    vacancies: Math.max(0, positions - confirmed - approved),
    fillRate: positions ? Math.round(confirmed / positions * 100) : null,
    tasksDone: tasks.filter(t => t.done).length, taskCount: tasks.length,
    statusCounts: ['Applied', 'Approved', 'Confirmed', 'Declined'].map(status => ({ status, count: applications.filter(a => a.status === status).length })),
    applicationCount: applications.length,
    revenue: sales.reduce((sum, sale) => sum + Math.round(sale.total * 100), 0) / 100,
    units: sales.reduce((sum, sale) => sum + sale.quantity, 0),
    inventory: (data.merch || []).filter(i => i.tourId === tourId).reduce((sum, i) => sum + i.stock, 0),
    products: [...products.values()].map(p => ({ ...p, revenue: p.revenue / 100 })).sort((a, b) => b.revenue - a.revenue),
    stopStaffing: stops.map(stop => {
      const localJobs = jobs.filter(j => j.scope === stop.id || j.scope === 'Tour-wide')
      const ids = new Set(localJobs.map(j => j.id))
      return { ...stop, positions: localJobs.reduce((sum, j) => sum + Number(j.capacity), 0), confirmed: applications.filter(a => ids.has(a.jobId) && a.status === 'Confirmed').length, approved: applications.filter(a => ids.has(a.jobId) && a.status === 'Approved').length }
    })
  }
}
