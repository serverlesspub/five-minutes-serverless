// Allow CloudWatch to read source maps
import 'source-map-support/register'

// Enable AWS X-Ray
import { captureHTTPsGlobal } from 'aws-xray-sdk'
import https from 'https'
captureHTTPsGlobal(https, true)

import { APIGatewayProxyResult } from 'aws-lambda'
import { getBooks } from './lib/main'
import { BooksDbRepository } from '../common/booksdb-repository'

export async function handler(): Promise<APIGatewayProxyResult> {
  try {
    if (!process.env.TABLE_NAME) {
      throw new Error('TABLE_NAME environment variable is required')
    }
    const booksDb = new BooksDbRepository(process.env.TABLE_NAME)

    const books = await getBooks(booksDb)

    return {
      statusCode: 200,
      body: JSON.stringify(books),
    }
  } catch(err) {
    return {
      statusCode: 400,
      body: err.toString(),
    }
  }
}