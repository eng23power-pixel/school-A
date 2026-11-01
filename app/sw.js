const C='ruqy-1.2.0';const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put(r,cl));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 if(u.hostname==='fonts.gstatic.com'||u.hostname==='fonts.googleapis.com'){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put(r,cl));return res})))}});
