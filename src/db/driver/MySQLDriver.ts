import mysql from "mysql";
import { FaucetDbDriver } from "../FaucetDatabase";
import { BaseDriver, BindValues, QueryResult, RunResult } from "./BaseDriver";

export interface IMySQLOptions {
  driver: FaucetDbDriver.MYSQL;
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
  poolLimit?: number;
}

export class MySQLDriver extends BaseDriver<IMySQLOptions> {
  private pool: mysql.Pool;
  private db: any;

  public override async open(options: IMySQLOptions): Promise<void> {
    this.pool = mysql.createPool({
      connectionLimit: options.poolLimit || 5,
      host: options.host,
      port: options.port || 3306,
      user: options.username,
      password: options.password,
      database: options.database,
    });
  }
  public override async close(): Promise<void> {
    await new Promise<void>((resolve) => this.pool.end(() => resolve()));
  }

  public override async exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if(err)
          return reject("sqlite exec() error: could not aquire connection: " + err.toString());
        
        connection.query(sql, (error, results) => {
          if(error)
            reject("sqlite exec() error [" + sql + "]: " + error.toString());
          else
            resolve();
          connection.release();
        })
      });
    });
  }

  public override async run(sql: string, values?: BindValues): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if(err)
          return reject("sqlite run() error: could not aquire connection: " + err.toString());
        
        connection.query(sql, values, (error, results) => {
          if(error)
            reject("sqlite run() error [" + sql + "]: " + error.toString());
          else {
            resolve({
              changes: results.affectedRows,
              lastInsertRowid: results.insertId,
            });
          }
          connection.release();
        })
      });
    });
  }
  
  public override async all(sql: string, values?: BindValues): Promise<QueryResult[]> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if(err)
          return reject("sqlite all() error: could not aquire connection: " + err.toString());
        
        connection.query(sql, values, (error, results) => {
          if(error)
            reject("sqlite all() error [" + sql + "]: " + error.toString());
          else {
            resolve(results);
          }
          connection.release();
        })
      });
    });
  }

  public override async get(sql: string, values?: BindValues): Promise<QueryResult | null> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if(err)
          return reject("sqlite get() error: could not aquire connection: " + err.toString());
        
        connection.query(sql, values, (error, results) => {
          if(error)
            reject("sqlite get() error [" + sql + "]: " + error.toString());
          else {
            resolve(results.length > 0 ? results[0] : null);
          }
          connection.release();
        })
      });
    });
  }

}
