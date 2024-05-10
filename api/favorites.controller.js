import FavoritesDAO from '../dao/favoritesDAO.js';

export default class FavoritesController {

    static async apiUpdateFavorites(req, res, next) {

        try {
            const FavoritesResponse = await FavoritesDAO.UpdateFavorites(
                req.body._id,
                req.body.favorites
            );

            // the following is the destructuring assignment syntax of javascript,
            // where FavoritesResponse is an assignment, which is { a: xxx , b: xxx, ...}
            // And what it does is to set error variable to be FavoritesResponse.error.
            var { error } = FavoritesResponse
            if (error) {
                res.status(500).json( { error });
            }


            res.json({ status: "success" });

        }

        catch(e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetFavorites(req, res, next) {

        try {
            let id = req.params.userId;
            let favorites = await FavoritesDAO.getFavorites(id);
            if (!favorites) {
                res.status(404).json( { error: "not found" });
                return;
            }
            res.json(favorites);
        
        }
        catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});

        }

    }




}