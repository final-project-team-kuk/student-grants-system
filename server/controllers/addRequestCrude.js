export const create =(req,res)=>{
    const new_request=new requestModel(req.body)
    new_request.save().then(request =>{
        return res.status(201).send(request)
    }).catch(error=> {
        return res.status(500).send({error : error.message})
    });
}
export const read =(req,res) =>{
    requestModel.find().then(requests=> {
        return res.status(201).send(requests)
    }).catch(error=>{
        return res.status(500).sen({error : error.massage})
    })
}
export const update =(req,res) =>{
    const 
}