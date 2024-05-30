const review = require('../modeles/reviews.modele.js');

class ControllerReview{
    static getReviews = (req, res) => {
        const id_jersey = req.query.id_jersey;
        review.getReviews(id_jersey, (err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "No reviews found" });
                    return;
                }
                res.status(500).send({ message: "Error retrieving reviews" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerReview;