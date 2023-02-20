"use strict";

// import
import http from "http";
import https from "https";
import fs from "fs";
import express from "express"; // @types/express
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Double, MongoClient, ObjectId } from "mongodb";
import cors from "cors"; // @types/cors
import fileUpload, { UploadedFile } from "express-fileupload";
import cloudinary, { UploadApiResponse } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// config
const app = express();
const HTTP_PORT = process.env.PORT || 1337;
const HTTPS_PORT = 1338;

const privKey = fs.readFileSync("keys/key.pem", "utf8");
const certificate = fs.readFileSync("keys/cert.crt", "utf8");
const credentials = { "key": privKey, "cert": certificate };

dotenv.config({ path: ".env" });
const DBNAME = "affittoEsubaffitto";
const CONNECTION_STRING = process.env.connectionString;
cloudinary.v2.config(JSON.parse(process.env.cloudinary as string));

const corsOptions = {
  origin: function (origin: any, callback: any) {
    return callback(null, true);
  },
  credentials: true,
};
const DURATA_TOKEN = 60 * 60 * 24 * 3; // 60sec * 60min * 24h * 3 giorni

// ***************************** Avvio ****************************************
let httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
  init();
});

let httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, function () {
  console.log("Server in ascolto sulle porte HTTP:" + HTTP_PORT + ", HTTPS:" + HTTPS_PORT);
});

let paginaErrore = "";
function init() {
  fs.readFile("./static/error.html", function (err, data) {
    if (!err) paginaErrore = data.toString();
    else paginaErrore = "<h1>Risorsa non trovata</h1>";
  });
}

/* *********************** (Sezione 2) Middleware ********************* */
// 1. Request log
app.use("/", function (req, res, next) {
  console.log("** " + req.method + " ** : " + req.originalUrl);
  next();
});

// 2 - risorse statiche
app.use("/", express.static("./static"));

// 3 - lettura dei parametri post
app.use("/", express.json({ limit: "20mb" }));
app.use("/", express.urlencoded({ extended: true, limit: "20mb" }));

// 4 - binary upload
app.use(
  "/",
  fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 }, // 20*1024*1024 // 20 M
  })
);

// 5 - log dei parametri
app.use("/", function (req, res, next) {
  if (Object.keys(req.query).length > 0)
    console.log("        Parametri GET: ", req.query);
  if (Object.keys(req.body).length != 0)
    console.log("        Parametri BODY: ", req.body);
  next();
});

// 6. cors
app.use("/", cors(corsOptions));

// 7. gestione login
app.post(
  "/api/login",
  function (req: Request, res: Response, next: NextFunction) {
    let connection = new MongoClient(CONNECTION_STRING as string);
    connection
      .connect()
      .then((client: MongoClient) => {
        const collection = client.db(DBNAME).collection("users");
        let regex = new RegExp(`^${req.body.usernameOrEmail}$`, "i");
        collection
          .findOne({ $or: [{ username: regex }, { email: regex }] })
          .then((dbUser: any) => {
            if (!dbUser) {
              res.status(401); // user o password non validi
              res.send("User not found");
            } else {
              //confronto la password
              bcrypt.compare(
                req.body.password,
                dbUser.password,
                (err: Error, ris: Boolean) => {
                  if (err) {
                    res.status(500);
                    res.send("Errore bcrypt " + err.message);
                    console.log(err.stack);
                  } else {
                    if (!ris) {
                      // password errata
                      res.status(401);
                      res.send("Wrong password");
                    } else {
                      let token = createToken(dbUser);
                      writeCookie(res, token);
                      res.send({ ris: "ok" });
                    }
                  }
                }
              );
            }
          })
          .catch((err: Error) => {
            res.status(500);
            res.send("Query error " + err.message);
            console.log(err.stack);
          })
          .finally(() => {
            client.close();
          });
      })
      .catch((err: Error) => {
        res.status(503);
        res.send("Database service unavailable");
      });
  }
);

function writeCookie(res: Response, token: string) {
  let cookie = `token=${token};Max-age=${DURATA_TOKEN};Path=/;HttpOnly=true;`;
  // HttpOnly=true significa che il cookie lato client non è accessibile da JavaScript
  // Secure=true fa si che il token venga trasmesso solo su connessioni HTTPS
  res.setHeader('set-cookie', cookie);
}

function createToken(user: any) {
  let time: any = new Date().getTime() / 1000;
  let now = parseInt(time); //Data attuale espressa in secondi
  let payload = {
    iat: user.iat || now,
    exp: now + DURATA_TOKEN,
    _id: user._id,
    username: user.username,
  };
  let token = jwt.sign(payload, privKey);
  console.log("Creato nuovo token " + token);
  return token;
}

// 8. gestione Logout
app.use("/api/logout", function (req: any, res, next) {
  let token = `token='';Max-age=-1;Path=/;HttpOnly=true`;
  res.setHeader('set-cookie', token);
  res.send({ ris: "ok" });
})

// 9. Controllo del Token
app.use("/api-token", function (req: any, res, next) {
  let token = readCookie(req);
  if (token == "") {
    res.status(403);
    res.send("Token mancante");
  } else {
    jwt.verify(token, privKey, (err: any, payload: any) => {
      if (err) {
        res.status(403);
        res.send("Token scaduto o corrotto");
      } else {
        let newToken = createToken(payload);
        writeCookie(res, newToken);
        req["payload"] = payload;
        next();
      }
    });
  }
});

function readCookie(req: Request): string {
  let token = '';
  if (req.headers.cookie) {
    let cookie = req.headers.cookie.split(';');

    let i = 0;
    do {
      if (cookie[i].trimStart().split("=")[0] == 'token') {
        token = cookie[i].split("=")[1];
      }
      i++;
    } while (cookie[i - 1].trimStart().split("=")[0] != 'token');
  }
  return token;
}

// 10. Apertura della connessione
app.use("/api/", function (req: any, res: any, next: NextFunction) {
  let connection = new MongoClient(CONNECTION_STRING as string);
  connection
    .connect()
    .then((client: any) => {
      req["connessione"] = client;
      next();
    })
    .catch((err: any) => {
      let msg = "Errore di connessione al db";
      res.status(503).send(msg);
    });
});

// open the connection also for the api-token routes
app.use("/api-token/", function (req: any, res: any, next: NextFunction) {
  let connection = new MongoClient(CONNECTION_STRING as string);
  connection
    .connect()
    .then((client: any) => {
      req["connessione"] = client;
      next();
    })
    .catch((err: any) => {
      let msg = "Errore di connessione al db";
      res.status(503).send(msg);
    });
});

/* ********************* (Sezione 3) USER ROUTES  ************************** */

app.post("/api-token/checkToken", function (req: Request, res: Response, next: NextFunction) {
  res.send({ ris: "ok" });
});

app.get("/api/places", function (req: any, res: any, next: NextFunction) {
  const collection = req["connessione"].db(DBNAME).collection("places");
  collection
    .find({})
    .toArray()
    .then((places: any) => {
      res.send(places);
    })
    .catch((err: any) => {
      res.status(500).send("Errore query " + err.message);
    })
    .finally(() => {
      req["connessione"].close();
    });
});

app.post("/api-token/addPlace", function (req: any, res: any, next: NextFunction) {
  const collection = req["connessione"].db(DBNAME).collection("places");
  collection
    .insertOne(req.body)
    .then((result: any) => {
      res.send({ ris: "ok" });
    })
    .catch((err: any) => {
      res.status(500).send("Errore query " + err.message);
    })
    .finally(() => {
      req["connessione"].close();
    });
});

app.post("/api-token/profile", function (req: any, res: any, next: NextFunction) {
  const collection = req["connessione"].db(DBNAME).collection("users");
  collection
    .findOne({ $or: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }] })
    .then((user: any) => {
      if(user){
        console.log(user);
        delete user.password;
        res.send({ profile: user, ris: "ok" }); 
      }else{
        res.send({ ris: '', error: 'User not found'});
      }
    })
    .catch((err: any) => {
      res.status(500).send("Errore query " + err.message);
    })
    .finally(() => {
      req["connessione"].close();
    });
});

app.post("/api/placesByUser", function (req: any, res: any, next: NextFunction) {
  const collection = req["connessione"].db(DBNAME).collection("places");
  collection
    .find({ owner: req.body.userId })
    .toArray()
    .then((places: any) => {
      res.send(places);
    })
    .catch((err: any) => {
      res.status(500).send("Errore query " + err.message);
    })
    .finally(() => {
      req["connessione"].close();
    });
});

app.post("/api/register", function (req: any, res: any, next: NextFunction) {
  const collection = req["connessione"].db(DBNAME).collection("users");
  collection.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((result: any) => {
    if (result) {
      res.status(400).send("Email o username già esistenti");
    }
    else {
      let passwordHash = bcrypt.hashSync(req.body.password, 10);
      let user = {
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
        role: "user",
        name: req.body.name,
        active: true
      };
      collection.insertOne(user)
        .then((result: any) => {
          res.send({ ris: "ok" });
        })
        .catch((err: any) => {
          res.status(500).send("Errore query " + err.message);
        })
        .finally(() => {
          req["connessione"].close();
        });
    }
  });
});

app.post("/api-token/base64Cloudinary", (req: any, res: any, next: any) => {
  if (!req.body.placeId || !req.body.img) {
    res.status(404);
    res.send("File or placeId is missed");
  } else {
    cloudinary.v2.uploader
      .upload(req.body.img, { folder: "progettoEsame" })
      .then((result: UploadApiResponse) => {
        let collection = req["connessione"].db(DBNAME).collection("places");
        // insert the url of the image in the db, in an array of images of the place
        collection
          .updateOne({ _id: new ObjectId(req.body.placeId) }, { $push: { images: result.secure_url } })
          .then((result: any) => {
            res.send({ ris: "ok" });
          })
      })
      .catch((err: any) => {
        res.status(500);
        res.send("Error upload file to Cloudinary. Error: " + err.message);
      });
  }
});

/* ********************** (Sezione 4) DEFAULT ROUTE  ************************* */
// Default route
app.use("/", function (req: any, res: any, next: NextFunction) {
  res.status(404);
  if (req.originalUrl.startsWith("/api/") || req.originalUrl.startsWith("/api-token/")) {
    res.send("Risorsa non trovata");
    req["connessione"].close();
  } else res.send(paginaErrore);
});

// Gestione degli errori
app.use("/", (err: any, req: any, res: any, next: any) => {
  if (req["connessione"]) req["connessione"].close();
  res.status(500);
  res.send("ERRR: " + err.message);
  console.log("SERVER ERROR " + err.stack);
});
