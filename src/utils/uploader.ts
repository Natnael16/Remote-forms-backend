
import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";


interface FileRequest extends Request {
  files: any;
}

/*
uploadImage: parses the photo
             uploads it to cloudinary and adds its URI to request body
             =>use req.body.photo to access the uri
*/
const uploadImage = async (
  req: FileRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { files } = req;
    const image = files.image;
    if (!files) {
      next();
    } else {
      const uploadToCloudinary = async (image : any) => {
        try {
          const res = await cloudinary.uploader.upload(image);
        return res;
        }
        catch(e){
          return null
        }
        
      };
        
      const cloud_result = await uploadToCloudinary(image.path);
      if (cloud_result){
        req.body.image = cloud_result.url;
        next();
      }
      
      
    }
  } catch (error) {
    res.json(error.message);
  }
};



const uploader = {
  uploadImage,
};

export default uploader;
