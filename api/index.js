const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Thealphabotz:imghost@cluster0.obw3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function getUserData(userId) {
    await client.connect();
    const db = client.db('tap_to_earn');
    const collection = db.collection('users');

    let user = await collection.findOne({ user_id: userId });
    if (!user) {
        user = { user_id: userId, balance: 0 };
        await collection.insertOne(user);
    }
    return user;
}

exports.handler = async (event) => {
    const { queryStringParameters, httpMethod } = event;
    const userId = queryStringParameters.user_id;
    let response;

    if (httpMethod === 'GET') {
        const user = await getUserData(userId);
        response = {
            statusCode: 200,
            body: JSON.stringify({ balance: user.balance }),
        };
    } else if (httpMethod === 'POST') {
        const user = await getUserData(userId);
        user.balance += 5; // Add coins
        const db = client.db('tap_to_earn');
        await db.collection('users').updateOne({ user_id: userId }, { $set: { balance: user.balance } });

        response = {
            statusCode: 200,
            body: JSON.stringify({ newBalance: user.balance }),
        };
    }

    return response;
};
