import { getBooks } from '../lib/main'

describe('Get Books', () => {
  describe('unit', () => {
    test('should invoke BooksDb.get', async () => {
      const bookDbMock = {
        get: jest.fn(),
      }

      await getBooks(bookDbMock)

      expect(bookDbMock.get).toHaveBeenCalledTimes(1)
      expect(bookDbMock.get).toHaveBeenCalledWith()
    })
  })

  describe('integration', () => {
    class LocalDb {
      private data: any[] = []

      // eslint-disable-next-line @typescript-eslint/require-await
      async get(): Promise<any[]> {
        return this.data
      }

      // eslint-disable-next-line @typescript-eslint/require-await
      async add(item: number): Promise<void> {
        this.data.push(item)
      }
    }

    test('should invoke BooksDb.get', async () => {
      const localDb = new LocalDb()

      localDb.add(1)
      localDb.add(2)
      localDb.add(3)
      const result = await getBooks(localDb)

      expect(result).toEqual([1, 2, 3])
    })
  })
})