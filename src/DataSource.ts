import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import { BackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime';
import { AkenzaQuery, AkenzaDataSourceConfig } from './types';

export class DataSource extends DataSourceApi<AkenzaQuery, AkenzaDataSourceConfig> {
  private baseUrl: string;
  private apiKey: string;

  constructor(instanceSettings: DataSourceInstanceSettings<AkenzaDataSourceConfig>, private backendSrv: BackendSrv) {
    super(instanceSettings);
    this.baseUrl = instanceSettings.jsonData.baseUrl;
    this.apiKey = instanceSettings.jsonData.apiKey;
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return this.doRequest('/v1/environments').then(
      (res: any) => {
        console.log(res);
        return {
          status: 'success',
          message: 'Success',
        };
      },
      (error: any) => {
        console.log(error);
        return {
          status: 'error',
          message: error.data?.message || 'could not verify API Key',
        };
      }
    );
  }

  async query(options: DataQueryRequest<AkenzaQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();

    // Return a constant for each query.
    const data = options.targets.map(target => {
      const query = target;
      return new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'Time', values: [from, to], type: FieldType.time },
          { name: 'Value', values: [query.constant, query.constant], type: FieldType.number },
        ],
      });
    });

    return { data };
  }

  private doRequest(url: string) {
    const options: BackendSrvRequest = {
      url: this.baseUrl + url,
      method: 'GET',
      headers: {
        'Api-Key': this.apiKey,
      }
    };

    return this.backendSrv.datasourceRequest(options);
  }
}
