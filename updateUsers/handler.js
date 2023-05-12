const aws = require("aws-sdk")

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams =  {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const updateUsers = async (event, context) => {
    const userId = event.pathParameters.id
    const body = JSON.parse(event.body)
    const params = {
        TableName: 'users',
        Key: { pk: userId },
        UpdateExpression: 'set #full_name = :full_name, #email = :email',
        ExpressionAttributeNames: { '#full_name' : 'full_name', '#email' : 'email' },
        ExpressionAttributeValues:
            { ':full_name' : body?.full_name, ':email' : body?.email || null },
        ReturnValues: 'ALL_NEW'
    };
    const res = await dynamodb.update(params).promise();
    console.log(res);
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'user': res.Attributes })
    };
}

module.exports = {
    updateUsers
}
