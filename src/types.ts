import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface AkenzaQuery extends DataQuery {
  assetId: string;
  asset: Asset;
  topic: string;
  dataKey: string;
}

/**
 * These are options configured for each DataSource instance
 */
export interface AkenzaDataSourceConfig extends DataSourceJsonData {
  baseUrl: string;
  apiKey: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface AkenzaSecureDataSourceConfig {
  apiKey: string;
}


export interface Asset {
  id: string;
  name: string;
  // no other properties since the API call is made using the fields param
}

export interface AssetList {
  offset: number;
  limit: number;
  total: number;
  data: Asset[];
}

export interface AssetData {
    deviceId: string;
    timestamp: string;
    topic: string;
    data: any;
}

export interface TimeSeriesData {
    dataPoints: any[];
    key: string;
}

export interface Environment {
  id: string;
  name: string;
  // other properties omitted
}

export interface EnvironmentList {
  offset: number;
  limit: number;
  total: number;
  data: Environment[];
}

export interface HttpPromise<T> {
  status: number;
  statusText: string;
  xhrStatus: string;
  data: T;
}
