import express from 'express';
import jwt from "jsonwebtoken";
const router = express.Router();

function decodeSessionToken(token) {
    try {
        const decoded = jwt.verify(token, 'zbok');
        return decoded;
    } catch (error) {
        console.error('Erreur lors du décryptage du token :', error.message);
        return null;
    }
}
router.get('/api/valide_cookie', (req, res) => {
    const cookie = req.cookies.session_id;
    if (cookie) {
        const decoded = decodeSessionToken(cookie);
        if (!decoded) {
            return res.status(200).json({ valid: false, message: 'Token invalide' });
        }
        decoded.valid = true
        res.status(200).json(decoded);
    } else {
        res.status(200).json({ valid: false, message: 'Aucun cookie trouvé' });
    }
});

export default router;