/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

export const lambdaHandler = async (event, context) => {
  try {
    //well
    const data = event.body ? JSON.parse(event.body) : null;

    const filtered_data = data ? data.filter(user => user.active) : [];

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: filtered_data.length > 0 ?  filtered_data: "No active data received",
      }),
    };
    return response;
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

  