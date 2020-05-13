import React, { PureComponent } from 'react';
import { Select} from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './DataSource';
import {AkenzaDataSourceConfig, AkenzaQuery, Asset} from './types';

type Props = QueryEditorProps<DataSource, AkenzaQuery, AkenzaDataSourceConfig>;

export class QueryEditor extends PureComponent<Props> {
  private loadingAssets = false;
  private options: Array<SelectableValue<string>> = [];

  onAssetIdChange = (event: SelectableValue<string>): void => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, assetId: event.value });
    // executes the query
    onRunQuery();
  };

  private loadAssets(): void {
    if (!this.loadingAssets && this.options.length == 0) {
      // render() is executed multiple times, in order to avoid spam calling our API this check has been put into place
      this.loadingAssets = true;
      this.props.datasource.getAssets().then(
        (assets: Asset[]) => {
          for (const asset of assets) {
            this.options.push({ label: asset.name, value: asset.id });
          }
        },
        (err: any) => {}
      );
    }
  }

  render() {
    this.loadAssets();

    return (
      <div className="gf-form">
        <Select
          placeholder={'Select an Asset'}
          options={this.options}
          value={this.props.query.assetId}
          onChange={this.onAssetIdChange}
        />
      </div>
    );
  }
}
