import UploadDAO from "../dao/uploadDAO.js";
import { Storage } from "@google-cloud/storage";



export default class UploadController {
    static async apiUploadImage(req, res, next) {


        let projectId = "infinitygallerystorage"; // Get this from Google Cloud
        let keyFilename = "infinitygallerystorage-ac5afdac036e.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
        const storage = new Storage({
                                projectId,
                                keyFilename,
                            });
        const bucket = storage.bucket("infinitygallerybucket1"); // Get this from Google Cloud -> Storage

        try {
            
            
            console.log("at backend");
            console.log(req);
            const formData = req.body;
            console.log('form data', formData);

            const imageFile = req.file;
            console.log (imageFile);
            console.log (imageFile.originalname);
            const obj = JSON.parse(JSON.stringify(formData));
            console.log(obj.imgfileName);

            const ImageId = obj.imgfileId;
            const imageTitle = obj.imgfileName;
            const imageModel = obj.imgfileModel;
            const extension = obj.imgfileType;
            const imageURL = "https://storage.cloud.google.com/infinitygallerybucket1/" + imageFile.originalname;
            const userInfo = {
                name: obj.imgfileUploaderName,
                _id: obj.imgfileUploader,
            }
            
            //const imgFormData = req.body.imgfile;

            const date = new Date();

            /**

            const uploadResponse = await UploadDAO.addUpload(
              ImageId,
              userInfo,
              imageModel,
              imageURL,
              imageTitle,
              date
            );
            */

            console.log("Made it /upload");
            try {
                if (req.file) {
                  console.log("File found, trying to upload...");
                  const blob = bucket.file(req.file.originalname);
                  const blobStream = blob.createWriteStream();
            
                  blobStream.on("finish", () => {
                    //res.status(200).send("Success");
                    console.log("Success");
                  });
                  blobStream.end(req.file.buffer);
                } else throw "error with img";
              } 
            catch (error) {
                res.status(500).send(error);
            }
            
            const uploadResponse = await UploadDAO.addUpload(
                ImageId,
                userInfo,
                imageModel,
                imageURL,
                imageTitle,
                date
              );


            /** 
            const uploadResponse = await UploadDAO.addUpload(
                "",
                "",
                "",
                imageURL,
                "",
                date
              );
              */




           /** 
            try {
                const ImageId = formData.get("imgfileId");
            }
            catch (e) {
                console.log(e);
            }
            **/

        


            /** 
            console.log("here");
            const imageTitle = formData.get("imgfileName");
            const imageModel = formData.get("imgfileModel");
            const extension =formData.get("imgfileType");
            const imageURL = `${ImageId}_post.` + extension;
            const userInfo = {
                name: formData.get("imgfileUploaderName"),
                _id: formData.get("imgfileUploader"),
            }


            //const imgFormData = req.body.imgfile;

            const date = new Date();

            const uploadResponse = await UploadDAO.addUpload(
              ImageId,
              userInfo,
              imageModel,
              imageURL,
              imageTitle,
              date
            );
            */
          


            var { error } = uploadResponse;

            if (error) {
                res.status(500).json({ error: "Unable to upload image info to backend database."});
            }
            else {
                res.json({
                    status: "success",
                    response: uploadResponse
                });
            }
        }
        catch (e) {
            //console.log(e);
            res.status(500).json({ errorw: e});
        }

    }

    



}