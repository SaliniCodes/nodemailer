const fs=require("fs")
const readable=fs.createReadStream('./binu.txt',{encoding:'utf-8'})
const writable=fs.createWriteStream('./athi.txt')
readable.on('data',(data)=>{
    console.log("***********************************************",data)
    writable.write(data)
})
//readable.pipe(writable)