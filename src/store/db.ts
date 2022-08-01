import Database from 'tauri-plugin-sql-api'

export default class DB {
  private db: Database

  private constructor(db: Database) {
    this.db = db
  }

  private static instance: DB

  static async getInstance(): Promise<DB> {
    if (!this.instance) {
      this.instance = new this(await Database.load('sqlite:notes.db'))
    }

    return this.instance
  }

  public async loadAllNotes(): Promise<Note[]> {
    return await this.db.select('SELECT * FROM notes')
  }

  public async saveNote(note: Note): Promise<Note> {
    const { lastInsertId } = await this.db.execute(
      'INSERT INTO notes(title, content) VALUES($1, $2)',
      [note.title, note.content]
    )

    note.id = lastInsertId

    return note
  }
}