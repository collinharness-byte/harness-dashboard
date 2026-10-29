import { test } from 'node:test'
import assert from 'node:assert/strict'
import { registerUser, loginUser, readUsers } from '../src/auth.js'
const storage=new Map()
globalThis.localStorage={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)}
test('local accounts validate credentials, normalize emails, and preserve roles',async()=>{
 const employee=await registerUser({name:'Casey',email:' CASEY@example.com ',password:'demo-password',role:'Worker'})
 assert.equal(employee.email,'casey@example.com')
 assert.equal(employee.role,'Worker')
 assert.equal(employee.password,undefined)
 assert.notEqual(employee.passwordHash,'demo-password')
 assert.equal((await loginUser('CASEY@example.com','demo-password')).id,employee.id)
 await assert.rejects(loginUser('casey@example.com','wrong'),/incorrect/)
 await assert.rejects(registerUser({name:'Duplicate',email:'casey@example.com',password:'another-password',role:'Manager'}),/already exists/)
 await assert.rejects(registerUser({name:'Short',email:'short@example.com',password:'short',role:'Manager'}),/8 characters/)
 await assert.rejects(registerUser({name:'Invalid',email:'invalid@example.com',password:'demo-password',role:'Admin'}),/Choose/)
 const manager=await registerUser({name:'Manager',email:'manager@example.com',password:'demo-password',role:'Manager'})
 assert.equal(manager.role,'Manager')
 assert.equal(readUsers().length,2)
})
