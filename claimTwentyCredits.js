import fetch from "node-fetch"


export default async function claimTwentyCredits(page) {
    // console.log("se recibio el gate: "+gate+" "+card)
    var result = await page.evaluate(async () => {
        var res = await fetch("https://glupcvv.co/api/v1/claim", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,es-CO;q=0.8,es;q=0.7",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://glupcvv.co/tools/authchecker2",
            "method": "GET"
        })
            .then(e => e.json())
            .catch(e => e);
        return res;
    })
    return result;
}

