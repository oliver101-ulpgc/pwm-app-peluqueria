import {DbServicesProvider} from "./db-services.provider";
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {Service} from "../../models/service.model";

const createTableIfNotExistsServicesStatement = `
  CREATE TABLE IF NOT EXISTS SERVICES
  (
    id       TEXT PRIMARY KEY,
    type     TEXT,
    image    TEXT,
    title    TEXT,
    price    INTEGER,
    duration INTEGER,
    favorite TEXT
  )
`;

const insertOrReplaceServicesStatement = `
  INSERT OR REPLACE INTO SERVICES
  (
    id,
    type,
    image,
    title,
    price,
    duration,
    favorite
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const deleteAllServicesStatement = `DELETE FROM SERVICES`;

const selectAllServicesQuery = `SELECT * FROM SERVICES`;

export class SqliteDbServicesProvider implements DbServicesProvider {
  private db!: SQLiteDBConnection;

  async initDb(): Promise<void> {
    const db = await new SQLiteConnection(CapacitorSQLite).createConnection(
      'data.db',
      false,
      'no-encryption',
      1,
      false
    );
    if (!this.db) {
      console.error('Error creating SQLiteConnection.');
      return;
    }
    this.db = db;
    await this.db.open();
    await this.db.execute(createTableIfNotExistsServicesStatement);
  }

  async getAllServices(): Promise<Service[]> {
    // FIXME: Don't query SQLite to avoid errors
    return [];
    const result = await this.db.query(selectAllServicesQuery);
    return result.values?.map(services => ({
      ...services,
    })) || [];
  }

  setServices(services: Service[]): void {
    this.db.run(deleteAllServicesStatement).then(
      () => services.forEach(
        service => this.db.run(
          insertOrReplaceServicesStatement,
          [
            service.id,
            service.type,
            service.image,
            service.title,
            service.price_euro,
            service.duration_minutes,
            service.isFavorite ? 'true' : 'false'
          ]
        )
      )
    );
  }
}
