const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    AWS.config.update({
        region: 'ap-south-1'
    })
    const dynamoDb = new AWS.DynamoDB.DocumentClient()

    try {
        await dynamoDb.delete({
            TableName: 'connections',
            Key: {
                connectionId: connectionId
            }

        }).promise();
        return { statusCode: 200 };
    } catch (err) {
        console.error('Error sending message:', err);
        return { statusCode: 500 };
    }
};
