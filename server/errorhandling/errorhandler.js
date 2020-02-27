module.exports = (err,req,res,next)=>{
  if(err.status){
    console.log(err)
    res.status(err.status).json({error: err.message})
  }else if(err.message){
    let msg = err.message.split(',\n')
    for(let i = 0; i < msg.length; i++){
      msg[i] = msg[i].substring(18)
    }
    console.log(err.message.split(',\n'))
    res.status(400).json({error: msg})
    
  }else{
    res.status(500).json({error: `server error`})
  }
}