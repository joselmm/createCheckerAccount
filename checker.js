import { chromium } from 'playwright-core';
import dotenv from "dotenv";
dotenv.config();
import signIn from './signIn.js';
import { generateCardFromString } from "./genCard.js"
import checkCard from './checkCard.js';
import notifier from 'node-notifier';



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

        if (resCard?.result && resCard.result === "Invalid Card") {
            console.log("Tarjeta invalida: " + card);
        }
        else if (resCard.hasOwnProperty("message") && resCard.message === "Server error") {
            console.log("error servidor")

        } else if (resCard.data.res === 'Insufficient Credits') {
            console.log("Creditos acabados para " + number + " pasando a " + (number + 1))
            var number = number + 1;
            await signIn(context, number);

        } else {


            console.log(resCard.data);
            i++;

            console.log("intento " + i);


            if (resCard.data.type === "CVV Declined" || resCard.data.type === "Approved") {

                notifier.notify({
                    title: '✅ Live Encontrada',
                    message: "Encontto una live en intento " + i
                });
            }else{
                /* {
                    "ret": "4971760000680872|02|2027|894",
                    "data": {
                        "type": "Declined",
                        "res": "RISK Card"
                    },
                    "ccInfo": {
                        "bin": 497176,
                        "brand": "VISA",
                        "type": "DEBIT",
                        "level": "GOLD",
                        "bank": "BANQUE DES CARAIBES",
                        "countryName": "FRANCE",
                        "countryCodeA2": "FR"
                    }
                } */
            }

            await signIn(context, number);

        }
    }

})()