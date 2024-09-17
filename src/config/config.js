const mongoose=require('mongoose')

const connctDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected succesfully');
    
}).catch((err)=>{
    console.log(err,'error found');
})
}

module.exports = connctDB;