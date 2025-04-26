import fetch from "node-fetch";
import { readFileSync } from "fs";
export default async function checkCard({ card, gate, number }) {
    /*  gate = gate || 2;
     card = card || "4234324234324"
     number = number || 8; */
     console.log(card)
    var headers = readFileSync("./HEADERS/joselmm" + number + ".json").toString();
    headers = JSON.parse(headers);
    headers = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es-CO;q=0.8,es;q=0.7",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": headers.cookie,
        "Referer": "https://glupcvv.co/tools/authchecker2",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }
    

    var r = await fetch("https://glupcvv.co/api/v1/freechecker", {
        "body": JSON.stringify({ card, gate }),
        "method": "POST",
        "headers": headers
    })
        .then(e => e.json())
        .catch(e => e);
    debugger
    return r

}


