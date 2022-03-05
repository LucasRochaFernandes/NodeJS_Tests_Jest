import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "0.0.0.0"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  Object.assign(defaultOptions, {
    host: process.env.SUPERTEST === "test" ? "localhost" : host,
    database:
      process.env.SUPERTEST === "test" ? "fin_test" : defaultOptions.database,
  });

  return await createConnection(defaultOptions);
};
