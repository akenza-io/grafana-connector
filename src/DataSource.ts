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
        // Implement a health check for your data source.
        return this.doRequest('/v1/environments', 'GET').then(
            () => {
                return {
                    status: 'success',
                    message: 'Success',
                };
            },
            (error: any) => {
                return {
                    status: 'error',
                    message: error.data?.message || 'could not verify API Key',
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
            (err: any) => {
                return err;
            }
        );
    }

    async getTopics(assetId: string): Promise<string[]> {
        return this.doRequest('/v3/assets/' + assetId + '/query/topics', 'GET').then(
            (topics: HttpPromise<string[]>) => {
                return topics.data;
            },
            (err: any) => {
                return err
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
            (err: any) => {
                return err;
            }
        );
    }

    private doRequest(url: string, method: string, params?: any, data?: any) {
        const options: BackendSrvRequest = {
            url: this.baseUrl + url,
            method: method,
            headers: {
                'Api-Key': this.apiKey,
            },
        };
        if (params) {
            options.params = params;
        }
        if (data) {
            options.data = data;
        }

        return this.backendSrv.datasourceRequest(options);
    }
}
