import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export function getAllUu() {
    return fetch(process.env.APP_SCRIPT,{
        method:"POST",
        body:JSON.stringify({
            getUU:true
        })
    }).then(e=>e.json())
}

