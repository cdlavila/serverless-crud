## Serverless REST API CRUD

This is a REST API CRUD developed using [Serverless Framework](https://serverless.com/), [AWS Lambda](https://aws.amazon.com/lambda/) and [DynamoDB](https://aws.amazon.com/dynamodb/). Additionally, we are using two different programming languages: [Node.js](https://nodejs.org/en/) and [Python](https://www.python.org/). 
<br><br>
We have 4 endpoints:

- `POST /users`
- `GET /users/{id}`
- `PUT /users/{id}`
- `DELETE /users/{id}`

### Installation

At this point you should have already installed [Node.js](https://nodejs.org/en/), [Python](https://www.python.org/), [Serverless Framework](https://serverless.com/), [AWS CLI](https://aws.amazon.com/cli/) and [Java JRE](https://www.java.com/en/download/).

1. Go to the **serverless-crud** directory: `cd serverless-crud`
2. Install NodeJS dependencies: `npm install`
3. Activate Python virtual environment: `source venv/bin/activate`
4. Install Python dependencies: `pip install -r requirements.txt`
5. Install DynamoDB local: `sls dynamodb install`

### Local development
1. Run the project locally: `serverless offline start`
2. Test the endpoint by calling the endpoint URLs that appears in the terminal output using [Postman](https://www.getpostman.com/) or similar software.
3. Additionally, you can also invoke the function directly: `serverless invoke local --function hello`

### Deployment
1. Configure your AWS credentials if you haven't done it yet: `serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY`
2. Deploy the project: `serverless deploy`
3. Test the endpoints by calling the URLs that appear in the terminal output.
4. Additionally, you can also invoke the functions directly: `serverless invoke --function <function_name>`
5. To remove the project from AWS, run: `serverless remove`

