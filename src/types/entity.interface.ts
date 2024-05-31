import { DataSource } from "./data-source.interface";

export interface Entity {
  name: string;
  dataSource: string | Record<string, unknown> | DataSource;
  apiResourceName: string;
};