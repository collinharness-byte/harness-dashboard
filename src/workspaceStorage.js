import { initialData } from './data.js'
const collections = ['stops','jobs','crew','applications','schedule','tasks','announcements','documents','workers','merch','merchSales']
export function loadWorkspace(storage = localStorage) {
  const raw = storage.getItem('tourline-v1')
  if (!raw) return initialData
  let saved
  try { saved = JSON.parse(raw) } catch { throw new Error('Saved workspace data could not be read. Your data has not been deleted.') }
  if (!saved || typeof saved !== 'object' || !Array.isArray(saved.tours) || !saved.tours.length || saved.tours.some(t => !t || !t.id)) {
    throw new Error('Saved workspace tours could not be loaded. Your data has not been deleted.')
  }
  const result = {...saved}
  for (const key of collections) {
    if (saved[key] == null) result[key] = []
    else if (!Array.isArray(saved[key]) || saved[key].some(item => !item || typeof item !== 'object')) throw new Error(`Saved ${key} data could not be loaded. Your data has not been deleted.`)
  }
  return result
}
