import {addKeyword, createBot,createFlow,createProvider, MemoryDB} from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const provider = createProvider(BaileysProvider)

//cambiar puerto para el tenant 
// casa23restobar puerto 3002
provider.initHttpServer(3002)
provider.http?.server.post('/message-with-image', handleCtx( async (bot, req, res) => {
    const body = req.body;
    const phone = body.phone;
    const message = body.message;
    const mediaUrl = body.mediaUrl;

    console.log(body);

    // Enviar mensaje con imagen
    await bot.sendMessage(phone, message, {
        media: mediaUrl // Aquí es donde se agrega la URL de la imagen
    });

    res.end();
}));


provider.http?.server.post('/message-without-image', handleCtx( async (bot, req, res) => {
    const body = req.body;
    const phone = body.phone;
    const message = body.message;

    console.log(body);

    // Enviar solo el mensaje sin imagen
    await bot.sendMessage(phone, message, {});

    res.end();
}));


const flowBienvenida = addKeyword('TaluuApp').addAnswer('bienvenid@!');

const main = async()=>{
    await createBot({
        flow:createFlow([flowBienvenida]),
        database:new MemoryDB(),
        provider

    })
}

main()