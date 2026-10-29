export const initialData = {
 tours: [{id:'t1',name:'The Blue Hour Tour',artist:'Luna & the Satellites',start:'2026-11-06',end:'2026-11-21'}],
 stops: [
 {id:'s1',tourId:'t1',city:'Chicago, IL',venue:'The Riviera Theatre',date:'2026-11-06',address:'4746 N Racine Ave, Chicago, IL',capacity:'2,500',loading:'Stage door on Lawrence Ave · dock opens at 10 AM',parking:'Crew vehicles in reserved east lot',technical:'House PA, 32-channel console, 3-phase power',contact:'Alex Morgan · venue production',phone:'312-555-0104',hotel:'The Guesthouse · 12 rooms',food:'Vegetarian options · dinner at 5 PM',cars:'2 passenger vans',equipment:'House lighting + touring backline',vip:'Meet & greet · 6:15 PM · 20 guests',sponsors:'Northstar Audio',contract:'Awaiting signed venue agreement'},
 {id:'s2',tourId:'t1',city:'Detroit, MI',venue:'Saint Andrew’s Hall',date:'2026-11-08',capacity:'1,000'},
 {id:'s3',tourId:'t1',city:'Cleveland, OH',venue:'The Agora',date:'2026-11-10',capacity:'2,000'},
 {id:'s4',tourId:'t1',city:'Brooklyn, NY',venue:'Brooklyn Steel',date:'2026-11-14',capacity:'1,800'}],
 crew:[{id:'c1',name:'Jordan Ellis',role:'Tour manager',location:'Tour-wide',email:'jordan@example.com',responsibility:'Tour operations',permission:'Manager'}, {id:'c2',name:'Sam Rivera',role:'Production lead',location:'Tour-wide',email:'sam@example.com',responsibility:'Sound and stage',permission:'Crew'}, {id:'c3',name:'Taylor Brooks',role:'Driver',location:'Tour-wide',email:'taylor@example.com',responsibility:'Ground transport',permission:'Crew'}],
 jobs:[{id:'j1',tourId:'t1',title:'Merchandise seller',scope:'s1',mode:'Application',pay:'$25 / hour',capacity:2,qualification:'Merch sales or customer service experience',start:'16:00',end:'23:00'}, {id:'j2',tourId:'t1',title:'Production assistant',scope:'Tour-wide',mode:'Application',pay:'$220 / day',capacity:1,qualification:'Live event experience; available for the full tour',start:'10:00',end:'23:00'}, {id:'j3',tourId:'t1',title:'Guest check-in volunteer',scope:'s1',mode:'Open shift',pay:'Volunteer',capacity:2,qualification:'Guest services',start:'17:00',end:'21:00'}],
 applications:[], profile:{name:'',email:'',location:'',qualifications:'',availability:'',approved:false},
 schedule:[{id:'e1',stopId:'s1',time:'10:00',title:'Load-in & production call',owner:'Production crew'}, {id:'e2',stopId:'s1',time:'15:00',title:'Soundcheck',owner:'Artist & audio'}, {id:'e3',stopId:'s1',time:'18:15',title:'VIP meet & greet',owner:'Guest services'}, {id:'e4',stopId:'s1',time:'19:00',title:'Doors open',owner:'All local crew'}, {id:'e5',stopId:'s1',time:'20:00',title:'Showtime',owner:'All crew'}, {id:'e6',stopId:'s1',time:'22:30',title:'Load-out',owner:'Production crew'}],
 tasks:[{id:'a1',stopId:'s1',title:'Confirm hotel rooming list',done:true},{id:'a2',stopId:'s1',title:'Collect signed venue agreement',done:false},{id:'a3',stopId:'s1',title:'Finalize local merchandise team',done:false}],
 announcements:[{id:'n1',tourId:'t1',title:'Welcome to the Blue Hour',body:'Please review your call times and confirm your assignments before show day.',audience:'All crew'}],
 documents:[{id:'d1',tourId:'t1',title:'Emergency contact · tour manager',detail:'Jordan Ellis · 312-555-0110',audience:'All crew'}]
}
export function transitionApplication(applications, id, action, jobs) {
 const current=applications.find(a=>a.id===id)
 if(!current) throw new Error('Application not found')
 const next={approve:'Approved',confirm:'Confirmed',decline:'Declined'}[action]
 if(!next || (action==='approve' && current.status!=='Applied') || (action==='confirm' && current.status!=='Approved') || (action==='decline' && current.status!=='Applied')) throw new Error('Invalid application transition')
 const job=jobs.find(j=>j.id===current.jobId)
 if(action==='approve' && applications.filter(a=>a.jobId===job.id && ['Approved','Confirmed'].includes(a.status)).length>=Number(job.capacity)) throw new Error('All positions are already reserved')
 return applications.map(a=>a.id===id?{...a,status:next}:a)
}
export function reserveShift(applications, job, profile) {
 if(!profile.approved) throw new Error('A manager must preapprove your worker profile first')
 if(!profile.qualifications.toLowerCase().includes(job.qualification.toLowerCase())) throw new Error(`This shift requires: ${job.qualification}`)
 if(applications.some(a=>a.jobId===job.id && a.email===profile.email && a.status!=='Declined')) throw new Error('You already have an application or assignment for this job')
 if(applications.filter(a=>a.jobId===job.id && ['Approved','Confirmed'].includes(a.status)).length>=Number(job.capacity)) throw new Error('This shift is full')
 return [...applications,{id:crypto.randomUUID(),jobId:job.id,name:profile.name,email:profile.email,availability:profile.availability,qualifications:profile.qualifications,status:'Confirmed'}]
}
