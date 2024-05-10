import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let upload;

export default class UploadDAO {
    static async injectDB(conn) {
        if (upload) {
            return;
        }
        try {
            upload = await conn.db(process.env.GALLERY_COLLECTION).collection('images');

        }
        catch (e) {
            console.error(`Unable to connect to uploadDAO: ${e}`);
        }
    }

    static async addUpload(ImageId, user, model, poster, title, date) {
        try {
            console.log("adding...");
            console.log(title);
            const ImageDoc = {
                name: user.name,
                model: model, 
                user_id: user._id,
                date: date,
                poster: poster,
                title: title,
                movie_id: ImageId,
            }
            return await upload.insertOne(ImageDoc);
        }
        catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e};
        }

    }

}