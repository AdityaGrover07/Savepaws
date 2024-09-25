// Upload a bunch of images with a folder name to aws-s3
const { Pet } = require("../models/schemas/petSchema");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectAclCommand,
} = require("@aws-sdk/client-s3");
const uniqid = require("uniqid");

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const uploadImages = async (req, res) => {
  let files = req.files;
  let petID = uniqid();
  let bucket = "paws-adoption";
  let contentType;
  if (files) {
    contentType = files[0].mimetype;
  }

  let buffers = [...files].map((element) => element.buffer);

  if (contentType == "image/jpeg") extension = ".jpeg";
  if (contentType == "image/webp") extension = ".webp";
  if (contentType == "image/svg") extension = ".svg";
  if (contentType == "image/jpg") extension = ".jpg";
  if (contentType == "image/png") extension = ".png";

  for (var i = 0; i < buffers.length; i++) {
    var response = await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `pets/${petID}-${i}${extension}`,
        Body: buffers[i],
        ContentType: contentType,
      })
    );
  }

  //  Public url to access aws-s3 uploads - aws-s3 Image url - https://paws-adoption.s3.amazonaws.com/pets/[FILENAME].jpg

  res.status(200).send(petID);
};

const profileImageUpload = async (req, res) => {
  let file = req.file;
  let UserID = req.params.userId;
  let bucket = "paws-adoption";
  let contentType = req.file.mimetype;

  console.log(UserID, contentType);

  if (contentType == "image/jpeg") extension = ".jpeg";
  if (contentType == "image/webp") extension = ".webp";
  if (contentType == "image/svg") extension = ".svg";
  if (contentType == "image/jpg") extension = ".jpg";
  if (contentType == "image/png") extension = ".png";

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `users/${UserID}${extension}`,
        Body: file.buffer,
        ContentType: contentType,
      })
    );

    res.status(200).send(UserID);
  } catch (err) {
    res.status(400).send(err);
  }

  //  Public url to access aws-s3 uploads - aws-s3 Image url - https://paws-adoption.s3.amazonaws.com/users/[FILENAME].jpg
};

// const getImages = async (req, res) => {
//   let PetID = req.params.petID;
//   let bucket = "paws-adoption";
//   let response = await Pet.find({ PetID: PetID });
//   let PhotoAmt = response[0].PhotoAmt;

//   var Images = [];
//   for (var i = 0; i < PhotoAmt; i++) {
//     response = await s3Client.send(
//       new GetObjectCommand({
//         Bucket: bucket,
//         Key: `pets/${PetID}-2.jpg`,
//       })
//     );

//     //Images.push(response);
//   }

//   res.send(response);
// };

module.exports = { uploadImages, profileImageUpload };
