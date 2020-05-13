import {
    DataQueryRequest,
    DataQueryResponse,
    DataSourceApi,
    DataSourceInstanceSettings,
    MutableDataFrame,
    FieldType,
} from '@grafana/data';
import {BackendSrv} from '@grafana/runtime';
import {BackendSrvRequest} from '@grafana/runtime';
import {
    AkenzaQuery,
    AkenzaDataSourceConfig,
    HttpPromise,
    AssetList,
    EnvironmentList,
    Asset,
    Environment, AssetData
} from './types';

export class DataSource extends DataSourceApi<AkenzaQuery, AkenzaDataSourceConfig> {
    private baseUrl: string;
    private apiKey: string;
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
                console.log(err)
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

    async query(options: DataQueryRequest<AkenzaQuery>): Promise<DataQueryResponse> {
        const {range} = options;
        const from = range!.from.valueOf();
        const to = range!.to.valueOf();
        // Return a constant for each query.
        const data = options.targets.map(target => {
            const query = target;
            return new MutableDataFrame({
                refId: query.refId,
                fields: [
                    {name: 'Time', values: [from, to], type: FieldType.time},
                    {name: 'Value', values: [], type: FieldType.number},
                ],
            });
        });

        return {data};
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
