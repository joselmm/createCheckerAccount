import { chromium } from 'playwright-core';
import dotenv from "dotenv";
import { writeFileSync } from "fs";
import getCaptchaSolution from './getCaptchaSoluction.js';
dotenv.config();




async function loginAccount (i) {
    var number=   Number(process.argv[2])      +i;
    // Paso 1: Iniciar el navegador (browser)
    var options = {
        headless: true ,
        args: ['--no-sandbox'] // Solo si es necesario
    }
    if(process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD){
        options.executablePath=process.env.PUPPETEER_EXECUTABLE_PATH
    }else{
        options.channel='chrome'
    }
    const browser = await chromium.launch(options);

    // Paso 2: Crear un contexto con configuración móvil
    const context = await browser.newContext({
        viewport: { width: 360, height: 640 }, // Viewport móvil
        isMobile: true, // Simular dispositivo móvil,
    });

    // Paso 3: Crear una página desde el contexto
    const page = await context.newPage();

    // Navegar a una URL
    await page.goto('https://glupcvv.co/');
    await page.getByText("Username").first().click();
    await page.waitForTimeout(500);
    await page.keyboard.type("joselmm" + number)



    await page.getByText("Password").first().click();
    await page.waitForTimeout(500);
    await page.keyboard.type(`jose5432`)


    for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(1000);
       var buffer= await page.locator("img[alt='Captcha']").screenshot()
        const base64 = buffer.toString('base64');

        var result = await getCaptchaSolution(base64);
        if (result) {

            await page.locator("input#captcha").click()
            await page.keyboard.type(result.trim());
            await page.locator("button[type='submit']").click();

            var res = await page.waitForResponse("https://glupcvv.co/api/v1/auth/login");
            var body = await res.body();
            var json = JSON.parse(body.toString());
            if (json && !json.hasOwnProperty("uu")) {
                await page.evaluate(()=>{
                    document.querySelector("input#captcha").value="";
                    return "ya"
                })

                await page.locator("img[alt='Captcha']").click();
                continue
            };

            await page.waitForResponse("https://glupcvv.co/dashboard")

            var cookies = JSON.stringify(await context.cookies());
            //console.log('Cookies after logging in:', cookies);
            writeFileSync("./cookies/joselmm" + number + '.json', cookies, 'utf8',);
            console.log("SE GUARDO COOKIES "+number);
            await browser.close();
            break;
        }

    }

}


for (let i = 0; i+Number(process.argv[2]) <= Number(process.argv[3]); i++) {
  await loginAccount(i);
}