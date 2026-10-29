import { test } from 'node:test'
import assert from 'node:assert/strict'
import { initialData, transitionApplication, reserveShift } from '../src/data.js'
const job={...initialData.jobs[0],capacity:1}
const app={id:'a',jobId:job.id,email:'worker@example.com',status:'Applied'}
test('applications require manager approval before worker confirmation',()=>{
 assert.throws(()=>transitionApplication([app],'a','confirm',[job]),/Invalid/)
 const approved=transitionApplication([app],'a','approve',[job])
 assert.equal(approved[0].status,'Approved')
 assert.equal(transitionApplication(approved,'a','confirm',[job])[0].status,'Confirmed')
 assert.equal(app.status,'Applied')
})
test('approval reserves capacity and decline does not consume a position',()=>{
 const other={...app,id:'b',email:'other@example.com'}
 const approved=transitionApplication([app,other],'a','approve',[job])
 assert.throws(()=>transitionApplication(approved,'b','approve',[job]),/reserved/)
 const declined=transitionApplication([app,other],'a','decline',[job])
 assert.equal(transitionApplication(declined,'b','approve',[job])[1].status,'Approved')
})
test('open shifts require preapproval, eligibility, available capacity, and no duplicate',()=>{
 const shift={...initialData.jobs[2],capacity:1}
 const profile={name:'Worker',email:'worker@example.com',qualifications:'Guest services, hospitality',availability:'November 6',approved:false}
 assert.throws(()=>reserveShift([],shift,profile),/preapprove/)
 assert.throws(()=>reserveShift([],shift,{...profile,approved:true,qualifications:'Driving'}),/requires/)
 const reserved=reserveShift([],shift,{...profile,approved:true})
 assert.equal(reserved[0].status,'Confirmed')
 assert.throws(()=>reserveShift(reserved,shift,{...profile,approved:true}),/already/)
 assert.throws(()=>reserveShift(reserved,shift,{...profile,approved:true,email:'second@example.com'}),/full/)
})
