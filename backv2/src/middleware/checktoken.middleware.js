const jwt= require("jsonwebtoken");


function checkToken(req, res, next){
    const token = req.cookies.session_id;
    if(token) {
        jwt.verify(token, 'zbok', (err, decoded) => {
            if(err) {
                return res.status(401).send({message: "Unauthorized"});
            }
            res.locals.dataToken = decoded;
            return next();
        });
    }else{
        return res.status(401).send({message: "Unauthorized"});
    }

}

module.exports = checkToken;