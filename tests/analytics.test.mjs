import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tourAnalytics } from '../src/analytics.js'
const data={stops:[{id:'s',tourId:'t'},{id:'other',tourId:'other'}],jobs:[{id:'j',tourId:'t',scope:'s',capacity:3},{id:'wide',tourId:'t',scope:'Tour-wide',capacity:1},{id:'other',tourId:'other',capacity:100}],applications:[{jobId:'j',status:'Confirmed'},{jobId:'j',status:'Approved'},{jobId:'wide',status:'Applied'},{jobId:'other',status:'Confirmed'}],tasks:[{stopId:'s',done:true},{stopId:'s',done:false},{stopId:'other',done:true}],merch:[{tourId:'t',stock:7},{tourId:'other',stock:100}],merchSales:[{tourId:'t',itemId:'m',name:'Shirt',quantity:2,total:50},{tourId:'t',itemId:'m',name:'Shirt',quantity:1,total:25},{tourId:'other',quantity:10,total:1000}]}
test('analytics scopes data to the tour and separates approvals from confirmations',()=>{
 const m=tourAnalytics(data,'t')
 assert.equal(m.positions,4);assert.equal(m.confirmed,1);assert.equal(m.approved,1);assert.equal(m.vacancies,2);assert.equal(m.fillRate,25)
 assert.equal(m.applicationCount,3);assert.equal(m.tasksDone,1);assert.equal(m.taskCount,2)
 assert.equal(m.revenue,75);assert.equal(m.units,3);assert.equal(m.inventory,7)
 assert.deepEqual(m.products,[{id:'m',name:'Shirt',units:3,revenue:75}])
 assert.equal(m.stopStaffing[0].positions,4);assert.equal(m.stopStaffing[0].confirmed,1)
})
test('empty tours show no-data percentages without NaN or invented sales',()=>{
 const m=tourAnalytics(data,'empty')
 assert.equal(m.fillRate,null);assert.equal(m.revenue,0);assert.equal(m.taskCount,0);assert.deepEqual(m.products,[])
})
