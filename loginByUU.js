import { chromium } from 'playwright-core';
import fetch from "node-fetch";
import dotenv from "dotenv";
import { writeFileSync } from "fs";
import getCaptchaSolution from './getCaptchaSoluction.js';
import { sendCookiesToAppscript } from "./sendCookiesToAppscript.js"
import { getAllUu } from "./getAllUu.js"
import express from "express";
import cors from "cors";
const app = express();
dotenv.config();



/* _------------------------ */
app.use(cors())
app.get('/', (req, res) => {
    res.json({ noError: true })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    keepAlive();
})



/* _------------------------ */
var options = {
    headless: process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD ? true : false,
    args: ['--no-sandbox'] // Solo si es necesario
}
if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD) {
    options.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
} else {
    options.channel = 'chrome'
}
const browser = await chromium.launch(options);

// Paso 2: Crear un contexto con configuración móvil
const context = await browser.newContext({
    viewport: { width: 360, height: 640 }, // Viewport móvil
    isMobile: true, // Simular dispositivo móvil,
});


var uuList = await getAllUu();/*  */

async function loginAccount(number = 1, limit = 300) {


    // Paso 3: Crear una página desde el contexto
    const page = await context.newPage();

    debugger


    // Paso 1: Iniciar el navegador (browser)



    // Navegar a una URL
    page.on("response", async (req) => {

        var url = req.url();
        if (url.startsWith("https://glupcvv.co/account")) {
            page.on("response", () => { })
            /* const allHeaders = await req.allHeaders(); */
            var cookies = (await context.cookies())
            var string = extractCookies(cookies);

            console.log(number)
            console.log(string)
            debugger
            console.log(await sendCookiesToAppscript({ cookie: string, number }))
            await page.close();
            await context.clearCookies();
            number++;

            if (number <= limit) {
                loginAccount(number, limit)
            }

        }
    }, { timeout: 60_000 })

    debugger

    await page.goto('https://glupcvv.co/auth/' + uuList["uu-" + number], { timeout: 15000000 });


}

function extractCookies(cookies) {
    var sCookies = ["__51vcke__3K42TrT29UPZMxpy", "__51vuft__3K42TrT29UPZMxpy", "session", "__vtins__3K42TrT29UPZMxpy", "__51uvsct__3K42TrT29UPZMxpy"]

    var string = sCookies.map(cookieName => {
        var value = cookies.find(({ name }) => name === cookieName).value;
        return `${cookieName}=${value}`
    }).join("; ")
    return string
}


/* for (let i = 0; i + Number(process.argv[2]) <= Number(process.argv[3]); i++) {
    await loginAccount(i);
} */

loginAccount();

async function keepAlive() {
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        console.log("Auto call to keep live activo")
        for (let i = 0; i <= 4; ++i) {
            await new Promise(r => setTimeout(r, 10 * 60 * 1000))
            var res = await fetch(process.env.APP_SCRIPT).then(e => e.text()).catch(e => e);
            console.log("respuesta " + i + " keep alive " + res)
        }
    }
}

