import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { BackendSrvRequest } from '@grafana/runtime';
import { AkenzaQuery, AkenzaDataSourceConfig } from './types';

export class DataSource extends DataSourceApi<AkenzaQuery, AkenzaDataSourceConfig> {
  private baseUrl: string;

  constructor(instanceSettings: DataSourceInstanceSettings<AkenzaDataSourceConfig>) {
    super(instanceSettings);
    this.baseUrl = instanceSettings.jsonData.baseUrl;
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return this.doRequest('').then(
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
          message: error.status + ' - ' + error.statusText + ': ' + error.data?.message || 'could not verify API Key',
        }
    });
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

  private doRequest(data: string) {
    let options: BackendSrvRequest = {
      url: this.baseUrl + '/v1/environments',
      headers: {},
      method: 'GET',
    };
    options.headers['Api-Key'] = '1ded1b6d-1f65-4ba3-8229-849fc6a7e646';

    return getBackendSrv().datasourceRequest(options);
  }
}
