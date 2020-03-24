interface IBook {
  id: string
  name: string
  authors: string[]
}

interface IBooksDb {
  get(): Promise<IBook[]>
}

export async  function getBooks(booksDb: IBooksDb): Promise<IBook[]> {
  return await booksDb.get()
}
