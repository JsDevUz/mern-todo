function userValid(req,res,next){
    const errors = []
    const {email,fullName,password} = req.body
    if(!email) errors.push('email is required')
    if(!password) errors.push('password is required')
    if(!fullName) errors.push('fullName is required')

    if(errors.length > 0){
    res.send({message:errors})
    }
    next()
}

module.exports = {userValid}