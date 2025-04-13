import { chromium } from 'playwright-core';
import dotenv from "dotenv";
import signIn from './signIn.js';
import { generateCardFromString } from "./genCard.js"
import checkCard from './checkCard.js';
dotenv.config();



(async () => {
    var dd = Number(process.argv[2]);
    console.log(dd)
    var number = dd || 50;
    var gate = 2;
    var bin = process.argv[3] || process.env.BIN;





    // Paso 1: Iniciar el navegador (browser)
    const browser = await chromium.launch({
        channel: 'chrome',
        headless: true,
        args: ['--no-sandbox'], // Solo si es necesario
    });

    // Paso 2: Crear un contexto con configuración móvil
    const context = await browser.newContext({
        viewport: { width: 360, height: 640 }, // Viewport móvil
        isMobile: true, // Simular dispositivo móvil,
    });

    // Paso 3: Crear una página desde el contexto
    const page = await context.newPage();
    await signIn(context, number)
    var card = generateCardFromString(bin);
    //console.log(card)
    await page.goto('https://glupcvv.co/tools/authchecker' + gate);


    var attempts = Number(process.env.ATTEMPTS);
    for (let i = 0; i < attempts; null) {
        var card = generateCardFromString(bin);

        var resCard = await checkCard(card, page, gate);
        //console.log(resCard);
        if (resCard.hasOwnProperty("message") && resCard.message === "Server error") {
            console.log("error servidor")
        } else if (resCard.data.res === 'Insufficient Credits') {
            console.log("Creditos acabados para " + number + " pasando a " + (number + 1))
            var number = number + 1;
            await signIn(context, number);

        } else {
            console.log(resCard.data);
            i++;

            console.log("intento " + i);
            await signIn(context, number);

        }
    }

})()