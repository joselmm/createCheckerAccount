import fetch from "node-fetch";
import {readFileSync} from "fs";
import  imageType from 'image-type';

export default function getCaptchaSolution() {

    return new Promise(async (resolve, reject) => {
        var dataUrl = await convertToDataUrl();

        fetch("https://api.groq.com/openai/v1/chat/completions",{

            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer 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"
            },
            body:JSON.stringify({
                "messages": [
                  {
                    "role": "user",
                    "content": [
                      {
                        "type": "text",
                        "text": "Just responde with the series of number whithout anything else"
                      },
                      {
                        "type": "image_url",
                        "image_url": {
                          "url": `${dataUrl}`
                        }
                      }
                    ]
                  }
                ],
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "temperature": 1,
                "max_completion_tokens": 1024,
                "top_p": 1,
                "stream": false,
                "stop": null
              })
        })
        .then(e=>e.json())
        .then(e=>{
          
            //console.log(e)
            resolve(e.choices[0].message.content)})
        .catch(e=>console.log(e))
    })   
}


async function convertToDataUrl() {


const contents = readFileSync("./captcha.png")
//console.log(contents);
const b64 = contents.toString('base64')

const type = await imageType(contents) 
if (type.mime === null) {
  process.exit(1)
}

return `data:${type.mime};base64,${b64}`;
}

