import jwp from "jsonwebtoken"
import "dotenv/config"

export default function Auth(req,res,next){
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader) return res.status(401).send({error: "No Token"})
    const split = authHeader.toString().split(' ')
   
    if(!split === 2) return res.status(401).send({error: "Token Error"})
    
    const [word, token] = split
    
    if(word !== "Bearer") return res.status(401).send({error: "Mas o que caralhos vc ta fazendo?"})
    jwp.verify(token, process.env.HASH_SALT, (err,decoded) =>{
        if(err) return res.status(401).send({error: "Token invalido, boa tentativa!"})
        console.log("decoded: ", decoded)
        req.body.createdBy = decoded.id
        return next()
    })
}