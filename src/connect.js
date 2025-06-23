const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const userName = event.queryStringParameters?.userName || '';
    AWS.config.update({
        region: 'ap-south-1'
    })
    const dynamoDb = new AWS.DynamoDB.DocumentClient()

    try {
        await dynamoDb.put({
            TableName: 'connections',
            Item: {
                connectionId: connectionId,
                timestamp: Date.now(),
                userName: userName
            }

        }).promise();
        return { statusCode: 200 };
    } catch (err) {
        console.error('Error sending message:', err);
        return { statusCode: 500 };
    }
};
