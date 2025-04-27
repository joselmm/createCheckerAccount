import { chromium } from 'playwright-core';
import dotenv from "dotenv";
import signIn from './signIn.js';
import { generateCardFromString } from "./genCard.js"
import checkCard from './checkCard.js';
import {writeFileSync} from "fs";
import {sendCookiesToAppscript} from "./sendCookiesToAppscript.js"
import notifier from 'node-notifier';
dotenv.config();



(async () => {

    var minNumber = Number(process.argv[2])|| 50;
    var maxNumber = Number(process.argv[3])|| minNumber + 10;
    console.log(minNumber+ " - "+maxNumber)
    var gate = 2;
    var bin = "223432xxxxxxxxxx|rnd|rnd|rnd";

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
    
    var card = generateCardFromString(bin);
    //console.log(card)
    await page.goto('https://glupcvv.co/tools/authchecker' + gate);
    var currentNumber = minNumber;
    page.on("request",async (req) => {
           
        if (req.resourceType() === 'xhr' || req.resourceType() === 'fetch') {
  
            const allHeaders = await req.allHeaders();
          
            // Filtrar: eliminar las claves que empiezan con ":"
            
            var cookie=allHeaders.cookie;
            
            writeFileSync("./HEADERS/joselmm" + currentNumber + ".json", JSON.stringify({cookie}));
            
            var resAS = await sendCookiesToAppscript({cookie, number:currentNumber})
            console.log(resAS)
            debugger
            console.log("Se guardó HEADERS " + currentNumber);
          }
          
        
    })

    for (let i = 0; i <= maxNumber - minNumber; i++) {
        currentNumber = minNumber+i;
        await signIn(context, currentNumber)
        var card = generateCardFromString(bin);

       
        var resCard = await checkCard(card, page, gate);
        //console.log(resCard);

        
    }

})()