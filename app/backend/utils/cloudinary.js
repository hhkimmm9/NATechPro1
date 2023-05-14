import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.upload(
            file,
            (result) => {
                resolve({
                    public_id: result.public_id,
                    url: result.url,
                });
            },
            {
                resource_type: "auto",
                folder: folder,
            }
        );
    });
}

export { uploads, cloudinary } 