// netlify/functions/contact.js
const { MongoClient } = require("mongodb");

let client; // cache the client between invocations

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || "{}");
    if (!name || !email || !subject || !message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "All fields are required" }) };
    }

    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
    }

    const db = client.db("portfolio");          // database name
    const collection = db.collection("contacts"); // collection name

    const result = await collection.insertOne({
      name, email, subject, message,
      timestamp: new Date(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Message sent successfully!", id: result.insertedId }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
