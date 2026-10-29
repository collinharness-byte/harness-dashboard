const KEY = 'tourline-demo-users-v1'
export function readUsers() { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
async function hash(password, salt) {
 const key = await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits'])
 const bits = await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:210000,hash:'SHA-256'},key,256)
 return Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,'0')).join('')
}
export async function registerUser({name,email,password,role}) {
 email=email.trim().toLowerCase();name=name.trim()
 if(!name||!email||password.length<8)throw new Error('Enter your name, email, and a password of at least 8 characters.')
 if(!['Manager','Worker'].includes(role))throw new Error('Choose a manager or employee account.')
 if(readUsers().some(u=>u.email===email))throw new Error('An account with this email already exists. Please log in.')
 const salt=crypto.randomUUID(), passwordHash=await hash(password,salt)
 const user={id:crypto.randomUUID(),name,email,role,salt,passwordHash}
 // Read again after password derivation to preserve any concurrent account additions.
 const users=readUsers();if(users.some(u=>u.email===email))throw new Error('An account with this email already exists.')
 localStorage.setItem(KEY,JSON.stringify([...users,user]));return user
}
export async function loginUser(email,password) {
 const user=readUsers().find(u=>u.email===email.trim().toLowerCase())
 if(!user||await hash(password,user.salt)!==user.passwordHash)throw new Error('Email or password is incorrect.')
 return user
}
