
import dotenv from "dotenv";
import { generateCardFromString } from "./genCard.js"
import checkCard from './checkCard copy.js';
import notifier from 'node-notifier';
dotenv.config();



(async () => {
    var dd = Number(process.argv[2]);
    var number = dd || 50;
    console.log(number)
    var gate = 2;
    var bin = process.argv[3] || process.env.BIN;

    var card = generateCardFromString(bin);
    //console.log(card)


    var attempts = Number(process.env.ATTEMPTS);
    for (let i = 0; i < attempts; null) {
        var card = generateCardFromString(bin);
        
        var resCard = await checkCard({card, number, gate});
        /* console.log(resCard); */
        

        if (resCard?.result && resCard.result === "Invalid Card") {
            console.log("Tarjeta invalida: " + card);
        }
        else if (resCard.hasOwnProperty("message") && resCard.message === "Server error") {
            console.log("error servidor")

        } else if (resCard?.data?.res && resCard.data.res === 'Insufficient Credits') {
            console.log("Creditos acabados para " + number + " pasando a " + (number + 1))
            var number = number + 1;
            /* await signIn(context, number); */

        } else {


            console.log(resCard.data);
            i++;

            console.log("intento " + i);


            if (resCard?.data?.type === "CVV Declined" || resCard?.data?.type === "Approved") {

                notifier.notify({
                    title: '✅ Live Encontrada',
                    message: "Encontto una live en intento " + i
                });
            }

       

        }
    }

})()