const jwt=require('jsonwebtoken')

const tokenVerify=(req,res,next)=>{
    const authHead=req.headers['authorization']
    if(!authHead)
        return res.status(404).send('unauthorized')
    const token=authHead.split(' ')[1]
    if(!token)
        return res.status(404).send('token not found')
    jwt.verify(token,'secretkey',
        (err,decoded)=>{
if(err)
    return res.status(401).send('unmatch token')
    decoded=decoded.email
    if(!decoded)
        return res.send('credential unmatch')
    
    req.body.email=decoded.email
    next();
    })
}
module.exports=tokenVerify;