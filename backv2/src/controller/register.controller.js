const Register = require('../modeles/register.modele');

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !"
        });
    }

    const register = new Register({
        id_role: req.body.id_role,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: crypto.createHash('sha512').update(req.body.password).digest('hex'),
        created_at: currentDate.toISOString().slice(0, 19).replace('T', ' ')
    });


    Register.register(register, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la création du compte."
            });
        else res.send(data);
    });
}

module.exports = Register;