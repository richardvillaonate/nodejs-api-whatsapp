import {addKeyword, createBot,createFlow,createProvider, MemoryDB} from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const provider = createProvider(BaileysProvider)
provider.initHttpServer(3002)
provider.http?.server.post('/message', handleCtx( async (bot,req,res)=>{
    const body=req.body
    const phone=body.phone
    const message=body.message
    const mediaUrl=body.mediaUrl
    

    // console.log(body)
   

    try {
        await bot.sendMessage(phone, message, {
            media: mediaUrl
        });
    
        res.status(200).json({
            status: 'success',
            message: 'Mensaje enviado correctamente',
            phone: phone,
            mediaUrl: mediaUrl
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Hubo un problema al enviar el mensaje',
            error: error.message
        });
    }

}))

const flowBienvenida = addKeyword('Hola').addAnswer('bienvenido!');

const main = async()=>{
    await createBot({
        flow:createFlow([flowBienvenida]),
        database:new MemoryDB(),
        provider

    })
}

main()