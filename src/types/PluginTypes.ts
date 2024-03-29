import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { Device } from './AkenzaTypes';

export interface AkenzaQuery extends DataQuery {
    assetId?: string;
    asset?: Device;
    topic?: string;
    dataKey?: string;
}

export interface AkenzaDataSourceConfig extends DataSourceJsonData {
    baseUrl: string;
    apiKey: string;
}
