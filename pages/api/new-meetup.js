
// post  // api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://ahmed925elshahawy:4D4SR4t97H74V5SO@cluster0.c1fgspe.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0");
        const db = client.db();
        const meetupCollection = db.collection("meetups");
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close();

        res.status(201).json({ message: "Meetup inserted successfully" })
    }
}