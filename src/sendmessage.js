const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const domainName = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const body = JSON.parse(event.body);

    const message = body;

    const apiGateway = new AWS.ApiGatewayManagementApi({
        endpoint: `${domainName}/${stage}`
    });
    AWS.config.update({
        region: 'ap-south-1'
    })
    const dynamoDb = new AWS.DynamoDB.DocumentClient()
    try {
        const allConnections = await dynamoDb.scan({
            TableName: 'connections'
        }).promise()
        console.log(allConnections);
        const promise = allConnections.Items
            .filter((item) => item.connectionId != connectionId)
            .map((item) => {
                return apiGateway.postToConnection({
                    ConnectionId: item.connectionId,
                    Data: JSON.stringify({ response: body, userName: allConnections.Items?.find((item) => item.connectionId == connectionId)?.userName }),
                }).promise();
            })
        await Promise.allSettled(promise);
        return { statusCode: 200 };
    } catch (err) {
        console.error('Error sending message:', err);
        return { statusCode: 500 };
    }
};
