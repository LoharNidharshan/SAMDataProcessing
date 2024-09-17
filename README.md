# Data Processing SAM Application
This project is a serverless application built using AWS SAM (Serverless Application Model). It includes an AWS Lambda function that processes JSON data, filters it based on a condition (active users), and returns the filtered results via API Gateway.

## Architecture Overview
The architecture consists of:

### API Gateway: 
Exposes an HTTP API endpoint for receiving requests.
### Lambda Function: 
Processes the JSON input data and filters it for active users.
### AWS Resource Groups & Application Insights: 
Automatically configured for monitoring the Lambda function.
### Pre-requisites
To deploy and run this application, you'll need:

AWS SAM CLI installed on your system.
AWS credentials configured on your machine.
## Project Structure
```bash
.
├── README.md                     # This file
├── hello-world/                  # Directory containing Lambda function code
│   └── app.js                    # Lambda function logic
├── template.yaml                 # SAM Template defining the infrastructure and function
```
## Lambda Function
The Lambda function is defined in the hello-world/app.js file:

## Handler Code:
```javascript
export const lambdaHandler = async (event, context) => {
  try {
    const data = event.body ? JSON.parse(event.body) : null;
    const filtered_data = data ? data.filter(user => user.active) : [];

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: filtered_data.length > 0 ? filtered_data : "No active data received",
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid JSON format",
        error: error.message, 
      }),
    };
  }
};
```
The function receives a JSON payload, parses it, and filters out inactive users, returning a 200 status with the result. In case of an error or invalid JSON, a 400 error is returned.

## SAM Template
The template.yaml file defines the AWS infrastructure for this project.

## Key Resources:
Lambda Function (HelloWorldFunction):
Handles incoming POST requests on the /hello path.
Filters and returns active user data.
Uses Node.js 20.x runtime.
API Gateway:
Exposes an HTTP POST method on the /hello path.
Application Insights:
Automatically monitors the Lambda function for performance and errors.
## SAM Template Snippet:
```yaml
Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: hello-world/
      Handler: app.lambdaHandler
      Runtime: nodejs20.x
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: post

  ApplicationInsightsMonitoring:
    Type: AWS::ApplicationInsights::Application
    Properties:
      ResourceGroupName: !Sub ApplicationInsights-SAM-${AWS::StackName}
      AutoConfigurationEnabled: 'true'
```
## How to Build and Deploy
Install Dependencies: Make sure you have AWS SAM CLI installed and configured.

Build the Project: Run the following command to build your application and install any necessary dependencies:

```bash
sam build
```
Deploy the Application: After building, deploy the application to AWS using:

```bash
sam deploy --guided
```
Follow the on-screen prompts to provide stack name, AWS region, etc.

## Monitoring and Logging
This application is set up with AWS Application Insights for monitoring the Lambda function. Additionally, AWS CloudWatch is used for capturing logs and metrics.

## Cleanup
To delete the stack and all the associated resources, run:

```bash
sam delete
```
This will remove all deployed resources from your AWS account.
