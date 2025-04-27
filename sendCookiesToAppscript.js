import fetch from "node-fetch";


export function sendCookiesToAppscript(toSave) {
    return fetch(process.env.APP_SCRIPT,{
        method:"POST",
        body:JSON.stringify({toSave})
    })
    .then(e=>e.text())
    .catch(e=>e)
}