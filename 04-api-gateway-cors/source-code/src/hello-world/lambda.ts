// Allow CloudWatch to read source maps
import 'source-map-support/register'

// You can import event types from @types/aws-lambda
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const body = event.body ? JSON.parse(event.body) : {}
  const responseStatusCode = body.statusCode || 200
  const responseBody = body.response || {
    hello: 'world'
  }

  if (responseStatusCode >= 400) {
    throw new Error(responseBody)
  }

  return {
    statusCode: responseStatusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(responseBody)
  }
}
