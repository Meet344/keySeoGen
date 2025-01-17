const jwt = require(`jsonwebtoken`)
require('dotenv').config()

const fetchUser = (req, res, next) => {
    try{
        const token = req.cookies.token

        if (!token) res.status(401).send({error: `Faulty Authentication`})

        try{
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.user = data.user
            next()
        }catch(error){
            res.status(401).send({error: `Faulty Authentication`})
        }
    }catch(error){
        res.status(500).send({error: `Internal Server Error`})
    }
}

module.exports = fetchUser