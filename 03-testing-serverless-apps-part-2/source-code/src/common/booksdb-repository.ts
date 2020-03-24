import { DocumentClient } from 'aws-sdk/clients/dynamodb'
const documentClient = new DocumentClient()

export interface IBook {
  id: string
  name: string
  authors: string[]
}

interface IDocumentClient {
  scan(scanInput: DocumentClient.ScanInput): {
    promise(): Promise<DocumentClient.ScanOutput>
  }
}

export class BooksDbRepository {
  public tableName: string
  public dc: IDocumentClient

  constructor(tableName: string, dc: IDocumentClient = documentClient) {
    this.tableName = tableName
    this.dc = dc
  }

  public async get(): Promise<IBook[]> {
    const params = {
      TableName: this.tableName,
    }

    const result = await this.dc.scan(params).promise()

    return (result.Items as IBook[]) || []
  }
}