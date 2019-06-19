import jwp from "jsonwebtoken"


export default function Auth(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({error: "No Token"})
    const split = authHeader.toString().split(' ')
   
    if(!split === 2) return res.status(401).send({error: "Token Error"})
    
    const [word, token] = split
    
    if(word !== "Bearer") return res.status(401).send({error: "Mas o que *#@!%#! vc ta fazendo?"})
    jwp.verify(token, "BaleiaQueCriaOProprioOceano", (err,decoded) =>{
        if(err) return res.status(401).send({error: "Token invalido, boa tentativa!"})
        req.body.createdBy = decoded.id
        req.body.nome = decoded.nome
        req.body.permission = decoded.permission
        return next()
    })
}