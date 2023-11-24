const express = require("express");
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");
const { fileModel } = require("../models/fileModel");

require("dotenv").config();

const fileRouter = express.Router();

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretAcessKey,
  region: "us-east-1",
});

// Create an S3 instance
const s3 = new AWS.S3();

// Use the express-fileupload middleware
fileRouter.use(fileUpload());

// Route for file upload to S3
fileRouter.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const uploadedFile = req.files.uploadedFile;

    // Create a params object for S3 upload
    const params = {
      Bucket: process.env.BucketName,
      Key: uploadedFile.name,
      Body: uploadedFile.data,
    };

    // Upload the file to S3
    const s3UploadResponse = await s3.upload(params).promise();

    // Create a MongoDB document with file metadata
    const file = new fileModel({
      filename: uploadedFile.name,
      fileUrl: s3UploadResponse.Location,
    });

    // Save the file metadata to MongoDB
    await file.save();

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Route to retrieve information about files from S3
fileRouter.get("/files", async (req, res) => {
  try {
    const s3Params = {
      Bucket: process.env.BucketName,
    };

    const s3Response = await s3.listObjectsV2(s3Params).promise();

    // Extract relevant information for the response
    const fileData = s3Response.Contents.map((file) => ({
      filename: file.Key,
      fileUrl: `https://${s3Params.Bucket}.s3.ap-south-1.amazonaws.com/${file.Key}`,
      lastModified: file.LastModified,
      size: (file.Size/1024)+"KB",
    }));

    res.status(200).json(fileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Route to delete a file
fileRouter.delete("/delete/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    // Find the file in the database
    const file = await fileModel.findOne({ filename });

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    // Delete the file from the database
    await fileModel.deleteOne({ filename });

    // Delete the file from S3 as well
    if (s3) {
      const params = {
        Bucket: process.env.BucketName,
        Key: filename,
      };

      await s3.deleteObject(params).promise();
    }

    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = { fileRouter };
