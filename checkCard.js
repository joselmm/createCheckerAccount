export default async function checkCard(card, page, gate) {
    console.log("se recibio el gate auth "+gate+": "+card)
    var result= await page.evaluate(async ({card, gate})=>{  
        var res= await fetch("https://glupcvv.co/api/v1/freechecker", {
            "body": JSON.stringify({ card, gate }),
            "method": "POST"
          })
          .then(e=>e.json())
          .catch(e=>e);
          return res;
    },{card,gate})
    return result;
}