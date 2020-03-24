import { BooksDbRepository } from '../booksdb-repository'
import DynamoDb, { DocumentClient } from 'aws-sdk/clients/dynamodb'
const dynamoDb = new DynamoDb()
const documentClient = new DocumentClient()

describe('Books DB Repository', () => {
  describe('unit', () => {
    test('should invoke dc.scan when get method is invoked', async () => {
      const dcMock = {
        scan: jest.fn().mockReturnValue({
          promise: () => Promise.resolve({ Items: [] }),
        }),
      }
      const booksDb = new BooksDbRepository('tableName', dcMock)
      await booksDb.get()

      expect(dcMock.scan).toHaveBeenCalledTimes(1)
      expect(dcMock.scan).toHaveBeenCalledWith({
        TableName: 'tableName',
      })
    })
  })

  describe('integration', () => {
    const tableName = 'test-dynamodb-table-getBooks'

    beforeAll(async () => {
      const params = {
        AttributeDefinitions: [{
          AttributeName: 'id',
          AttributeType: 'S',
        }],
        KeySchema: [{
          AttributeName: 'id',
          KeyType: 'HASH',
        }],
        BillingMode: 'PAY_PER_REQUEST',
        TableName: tableName,
      }

      await dynamoDb.createTable(params).promise()

      await dynamoDb.waitFor('tableExists', {
        TableName: tableName,
      }).promise()
    }, 60 * 1000)

    afterAll(async () => {
      await dynamoDb.deleteTable({
        TableName: tableName,
      }).promise()

      await dynamoDb.waitFor('tableNotExists', {
        TableName: tableName,
      }).promise()
    }, 60 * 1000)

    test('should scan data from the table', async () => {
      await documentClient.put({
        TableName: tableName,
        Item: {
          id: '978-1617294723',
          title: 'Serverless Applications with Node.js',
          authors: ['Aleksandar Simović', 'Slobodan Stojanović'],
        },
      }).promise()

      const booksDb = new BooksDbRepository(tableName)
      const result = await booksDb.get()

      expect(result).toEqual([{
        id: '978-1617294723',
        title: 'Serverless Applications with Node.js',
        authors: ['Aleksandar Simović', 'Slobodan Stojanović'],
      }])
    }, 60 * 1000)
  })
})