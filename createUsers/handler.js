const aws = require("aws-sdk")
const { randomUUID } = require("crypto")

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

const createUsers = async (event, context) => {
    const body = JSON.parse(event?.body)
    const data = {
        id: randomUUID(),
        full_name: body?.full_name,
        email: body?.email,
    }
    const params = {
        TableName: 'users',
        Item: data
    };
    const res = await dynamodb.put(params).promise();
    return {
        "statusCode": 200,
        "body": JSON.stringify({'user': params?.Item})
    }
}

module.exports = {
    createUsers
}
