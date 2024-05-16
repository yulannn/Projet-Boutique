const Register = require('../modeles/register.modele');
const crypto = require('crypto');

exports.register = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Le contenu ne peut pas être vide !"
        });
    }

    const { email, first_name, last_name, password } = req.body;
    const id_role = 2;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    const user = { id_role, email, first_name, last_name, password: hashedPassword, created_at: formattedDate };

    Register.register(user, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création du compte."
            });
        } else {
            res.status(200).send(data);
        }
    });
}
