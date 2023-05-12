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
    const userBody = JSON.parse(event?.body)
    userBody.pk = randomUUID();
    const params = {
        TableName: 'users',
        Item: userBody
    };
    const res = await dynamodb.put(params).promise();
    console.log(res);
    return {
        "statusCode": 200,
        "body": JSON.stringify({'user': params?.Item})
    }
}

module.exports = {
    createUsers
}
