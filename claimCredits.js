import { chromium } from 'playwright';
import dotenv from "dotenv";
import signIn from './signIn.js';
import {generateCardFromString} from "./genCard.js"
import checkCard from './checkCard.js';
import claimTwentyCredits from './claimTwentyCredits.js';
dotenv.config();



(async () => {


    var numberFrom = Number(process.argv[2]) ;

	





    // Paso 1: Iniciar el navegador (browser)
    const browser = await chromium.launch({
        channel: 'chrome',
        headless: true,
        args: ['--no-sandbox'] // Solo si es necesario
    });

 // Paso 2: Crear un contexto con configuración móvil
    const context = await browser.newContext({
        viewport: { width: 360, height: 640 }, // Viewport móvil
        isMobile: true, // Simular dispositivo móvil,
    });

    const page = await context.newPage();
    



    await page.goto("https://glupcvv.co/tools/authchecker2");




    for (let i = 0; true; i++) {
        await signIn(context, numberFrom)
        var resCredits = await claimTwentyCredits(page);
        console.log("reclamando "+numberFrom)
        console.log(resCredits)

        /* {"claim":20} */
        numberFrom=numberFrom+1;
    }

})()