const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { name, email, message } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    // MongoDB connection
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    
    const db = client.db('portfolio'); // Your database name
    const collection = db.collection('contacts'); // Your collection name
    
    // Insert the contact data
    const result = await collection.insertOne({
      name,
      email,
      message,
      timestamp: new Date(),
      ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown'
    });

    await client.close();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!',
        id: result.insertedId 
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};