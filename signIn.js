import { readFileSync } from "fs";


export default async function signIn(context, number) {
    // Paso 1: Iniciar el navegador (browser)

    await context.clearCookies();
    // Navegar a una URL
    var cookies = JSON.parse(readFileSync("./cookies/joselmm" + number + ".json").toString());



    await context.addCookies(cookies)

    return true;

}