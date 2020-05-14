import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { Asset } from '../types/AkenzaTypes';

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

