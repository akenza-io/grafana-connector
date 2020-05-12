import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface AkenzaQuery extends DataQuery {
  queryText?: string;
  constant: number;
}

export const defaultQuery: Partial<AkenzaQuery> = {
  constant: 6.5,
};

/**
 * These are options configured for each DataSource instance
 */
export interface AkenzaDataSourceConfig extends DataSourceJsonData {
  path?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface AkenzaSecureDataSourceConfig {
  apiKey?: string;
}
