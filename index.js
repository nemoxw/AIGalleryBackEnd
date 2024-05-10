import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import ImagesDAO from './dao/imagesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';
import UploadDAO from './dao/uploadDAO.js';




async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.GALLERY_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        // Connnect to MongoDB server
        await client.connect();
        await ImagesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);
        await UploadDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });   
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

// We export here for the benefit of testing
export default app;