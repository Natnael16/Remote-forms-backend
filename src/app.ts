import express, {
  Application
} from "express";

import cors from "cors";

import generatePdf from "./documents/generatePDF";

import puppeteer from "puppeteer";

const app: Application = express();

const formData = require("express-form-data");
const os = require("os");
import PdfForm from "../src/models/form";
import uploader from "../src/utils/uploader";
import cloudinaryConfigs from "./utils/cloudinary";

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config(cloudinaryConfigs);

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname))
app.get("/", (req, res)=> {
  res.status(200).send("working properly")
})
app.post("/create-pdf", uploader.uploadImage, async (req, res) => {
  try {
    const created_doc = await PdfForm.create(req.body);

    res.status(201).send({ Document: created_doc });
  } catch (error) {
    res.status(204).send({ error: error.message });
  }
});

app.post("/fetch-pdf", async (req, res) => {
  function escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  try {
    if (req.body.name) {
      req.body.name = { $regex: new RegExp(escapeRegex(req.body.name), "gi") };
    } else {
      req.body = {};
    }

    const uploaded = await PdfForm.find(req.body).sort("-createdAt");
    res.status(200).send(uploaded);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.post("/download-pdf", async (req, res) => {
  try {
    console.log("downloading ...");
    const pdf = await generate(req.body);
    console.log("byte length", pdf)
    res.set({
      "Content-Type": "application/pdf", //here you set the content type to pdf
      "Content-Disposition": "inline; filename=" + `${req.body.name}` //if you change from inline to attachment if forces the file to download but inline displays the file on the browser
    });
    res.send(pdf); // here we send the pdf file to the browser

  } catch (error) {
    res.status(501);
    console.log(error.message)
  }
});

app.delete("/delete-pdf/:regNo", async (req, res) => {
  try {
    await PdfForm.deleteOne({ regNo: req.params.regNo });
    res.status(204).json("Delete successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const generate = async (body) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });

    // Create a new page
    const page = await browser.newPage();
    var html = generatePdf(body);
    //Get HTML content from HTML file

    await page.setContent(html, { waitUntil: "networkidle0" });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType("screen");

    // Downlaod the PDF
    const pdf = await page.pdf({
      landscape: true,
      // path: path.join(__dirname,`${body.name}${body.regNo}.pdf`),
      format: "A4",
      printBackground: true,
      timeout : 300000
    });
    await browser.close();
    return pdf;
  } catch (e) {
    console.log(e.message)
    return null;
  }
};
export default app;
