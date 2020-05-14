import {
    DataQueryRequest,
    DataQueryResponse,
    DataSourceApi,
    DataSourceInstanceSettings, DateTime,
    FieldType,
    MutableDataFrame,
} from '@grafana/data';
import {BackendSrv, BackendSrvRequest} from '@grafana/runtime';
import {
    AkenzaDataSourceConfig,
    AkenzaQuery,
    Asset,
    AssetData,
    AssetList,
    Environment,
    EnvironmentList,
    HttpPromise, TimeSeriesData
} from './types';
import buildUrl from 'build-url';

export class DataSource extends DataSourceApi<AkenzaQuery, AkenzaDataSourceConfig> {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private environmentId = '';

    constructor(instanceSettings: DataSourceInstanceSettings<AkenzaDataSourceConfig>, private backendSrv: BackendSrv) {
        super(instanceSettings);
        this.baseUrl = instanceSettings.jsonData.baseUrl;
        this.apiKey = instanceSettings.jsonData.apiKey;
    }

    async testDatasource() {
        return this.doRequest('/v1/environments', 'GET').then(
            () => {
                return {
                    status: 'success',
                    message: 'Success',
                };
            },
            (error: any) => {
                let message = error.status === 401 ? '401 Unauthorized - API Key provided is not valid' : (error.data?.message || 'could not verify API Key');
                return {
                    status: 'error',
                    message: message,
                };
            }
        );
    }

    async query(options: DataQueryRequest<AkenzaQuery>): Promise<DataQueryResponse> {
        const from: DateTime = options.range.from;
        const to: DateTime = options.range.to;
        const panelData: MutableDataFrame[] = [];
        for (let target of options.targets) {
            if (target.assetId && target.topic && target.dataKey) {
                const timeSeriesData = await this.getTimeSeriesData(target, from.toISOString(), to.toISOString());
                const data: number[] = [];
                const time: number[] = [];
                for (let dataPoint of timeSeriesData.dataPoints) {
                    // first entry in the array is always the value
                    data.push(dataPoint[0]);
                    // converts the ISO String to unix timestamp
                    time.push(new Date(dataPoint[1]).valueOf());
                }
                panelData.push(new MutableDataFrame({
                    refId: target.refId,
                    fields: [
                        {name: 'Time', values: time, type: FieldType.time},
                        {name: target.asset.name + ' - ' + target.dataKey, values: data, type: FieldType.number},
                    ],
                }));
            }
        }

        return {data: panelData};
    }

    async getTimeSeriesData(query: AkenzaQuery, from: string, to: string): Promise<TimeSeriesData> {
        const body = {
            dataKey: query.dataKey,
            topic: query.topic,
            timestamp: {
                gte: from,
                lte: to,
            },
        };

        return this.doRequest('/v3/assets/' + query.assetId + '/query/time-series', 'POST', null, body).then(
            (timeSeriesData: HttpPromise<TimeSeriesData>) => {
                return timeSeriesData.data;
            }, (error: any) => {
                return error;
            }
        );
    }

    async getAssets(): Promise<Asset[]> {
        const params = {
            unpaged: true,
            // has to be a string, since the backendSrv just calls toString() on it which results in [Object object] and an API error...
            fields: '{"id": true, "name": true}',
        };
        this.environmentId = await this.getEnvironment().then(environment => {
            return environment.id;
        });

        return this.doRequest('/v2/environments/' + this.environmentId + '/devices', 'GET', params).then(
            (assetListHttpPromise: HttpPromise<AssetList>) => {
                return assetListHttpPromise.data.data;
            },
            (error: any) => {
                return error;
            }
        );
    }

    async getTopics(assetId: string): Promise<string[]> {
        return this.doRequest('/v3/assets/' + assetId + '/query/topics', 'GET').then(
            (topics: HttpPromise<string[]>) => {
                return topics.data;
            },
            (error: any) => {
                return error
            });
    }

    async getKeys(assetId: string, topic: string): Promise<string[]> {
        const queryOptions = {
            topic: topic,
            limit: 1,
            skip: 0,
        };

        return this.doRequest('/v3/assets/' + assetId + '/query', 'POST', null, queryOptions).then(
            (res: HttpPromise<AssetData[]>) => {
                const keys: string[] = [];
                Object.keys(res.data[0].data).forEach(key => keys.push(key));
                return keys;
            },
            (error: any) => {
                return error;
            });
    }

    private async getEnvironment(): Promise<Environment> {
        return this.doRequest('/v1/environments', 'GET').then(
            (environmentListHttpPromise: HttpPromise<EnvironmentList>) => {
                return environmentListHttpPromise.data.data[0];
            },
            (error: any) => {
                return error;
            }
        );
    }

    private doRequest(path: string, method: string, params?: any, data?: any) {
        const options: BackendSrvRequest = {
            url: buildUrl(this.baseUrl, {path}),
            method,
            params,
            data,
            headers: {
                'Api-Key': this.apiKey,
            },
        };

        return this.backendSrv.datasourceRequest(options);
    }
}
