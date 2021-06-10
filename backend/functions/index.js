// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const app = express();
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://us-central1-map-places-311d1.cloudfunctions.net"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

// Automatically allow cross-origin requests
// app.use(
//   cors({ origin: "https://us-central1-map-places-311d1.cloudfunctions.net/" })
// );

app.post("/", async (req, res) => {
  const place = req.body;
  const addedPlace = await admin.firestore().collection("places").add(place);

  res.status(201).send({result: `Place with ID: ${addedPlace.id} added.`});
});

app.get("/", async (req, res) => {
  const placesReff = admin.firestore().collection("places")
  let snapshot = await admin.firestore().collection("places").get();
  let places = [];

  if (req.query.filter_by == "favorite") {
    const filteredByFavorite = placesReff.where('favorite', '==', true)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot)
      snapshot = querySnapshot
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    places.push({ id, ...data });
  });

  res.status(200).send(JSON.stringify(places));
});

app.get("/:id", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("places")
    .doc(req.params.id)
    .get();
    
  const placeId = snapshot.id;
  const placeData = snapshot.data();

  res.status(200).send(JSON.stringify({ id: placeId, ...placeData }));
});

app.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const snapshot = await admin
      .firestore()
      .collection("places")
      .doc(req.params.id)
      .update(body);
  
    const placeId = snapshot.id;
    const placeData = snapshot.data();
  
    res.status(200).send({ id: placeId, ...placeData });
  }
  catch (err) {
    console.log(err)
    res.send({error: err})
  }
});

app.delete("/:id", async (req, res) => {
  const body = req.body;
  const snapshot = await admin
    .firestore()
    .collection("places")
    .doc(req.params.id)
    .delete();

  res.status(200).send({result: `Place with ID: ${snapshot.id} successfully deleted.`});
});

exports.places = functions.https.onRequest(app);
