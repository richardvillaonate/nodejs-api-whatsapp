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

    // console.log(body);

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


const flowBienvenida = addKeyword(['hola', 'Hola', 'buenas', 'Buenas'])
    .addAnswer(
        `¡Hola! 👋  

Link para realizar pedido y ver menú ⬇  
https://taluu.app/pedidos/casa23  

Para cotizar tu evento ⬇  
** Nombre:*  
** Tipo de evento:*  
** Fecha:*  
** Hora:*  
** Número de personas:*  
** Celular:*  
** Observaciones:*  

📍 *Horarios*  

*Lunes - Jueves*  
  🕛 Día: 12:00 pm - 3:00 pm  
  🌙 Noche: 6:00 pm - 10:00 pm  

*Viernes - Sábado - Domingo*  
  🕛 Día: 12:00 pm - 4:00 pm  
  🌙 Noche: 6:00 pm - 11:00 pm  

📍 Calle 7 # 11-99`
    );


const main = async()=>{
    await createBot({
        flow:createFlow([flowBienvenida]),
        database:new MemoryDB(),
        provider

    })
}

main()