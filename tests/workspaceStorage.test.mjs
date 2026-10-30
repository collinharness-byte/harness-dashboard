import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadWorkspace } from '../src/workspaceStorage.js'
const storage=value=>({getItem:()=>value})
test('older saved workspaces hydrate missing collections without overwriting existing data',()=>{
 const old={tours:[{id:'tour',name:'My tour'}],jobs:[{id:'job'}],customNotes:'Keep this'}
 const result=loadWorkspace(storage(JSON.stringify(old)))
 assert.deepEqual(result.tours,old.tours);assert.deepEqual(result.jobs,old.jobs)
 assert.deepEqual(result.stops,[]);assert.deepEqual(result.workers,[])
 assert.equal(result.customNotes,'Keep this');assert.equal(old.stops,undefined)
})
test('invalid saved data reports an error rather than silently replacing the workspace',()=>{
 for(const raw of ['broken','null','{}',JSON.stringify({tours:[]}),JSON.stringify({tours:[{id:'t'}],jobs:{}})])assert.throws(()=>loadWorkspace(storage(raw)),/not been deleted/)
})
