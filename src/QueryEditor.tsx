import React, {PureComponent} from 'react';
import {Select} from '@grafana/ui';
import {QueryEditorProps, SelectableValue} from '@grafana/data';
import {DataSource} from './DataSource';
import {AkenzaDataSourceConfig, AkenzaQuery, Asset} from './types';

type Props = QueryEditorProps<DataSource, AkenzaQuery, AkenzaDataSourceConfig>;

export class QueryEditor extends PureComponent<Props> {
    private loadingAssets = false;
    private assetSelectOptions: Array<SelectableValue<string>> = [];
    private topicsSelectOptions: Array<SelectableValue<string>> = [];
    private keySelectOptions: Array<SelectableValue<string>> = [];

    private loadAssets(): void {
        if (!this.loadingAssets && this.assetSelectOptions.length == 0) {
            // render() is called multiple times, in order to avoid spam calling our API this check has been put into place
            this.loadingAssets = true;
            this.props.datasource.getAssets().then(
                (assets: Asset[]) => {
                    for (const asset of assets) {
                        this.assetSelectOptions.push({label: asset.name, value: asset.id, asset: asset});
                    }
                },
                (err: any) => {
                }
            );
        }
    }

    private loadTopics(assetId: string): void {
        this.props.datasource.getTopics(assetId).then(
            (topics: string[]) => {
                this.topicsSelectOptions = [];
                for (const topic of topics) {
                    this.topicsSelectOptions.push({label: topic, value: topic});
                }
                // force the query editor to update so the topics select gets the options
                this.forceUpdate();
            },
            (err: any) => {

            }
        )
    }

    private loadKeys(assetId: string, topic: string): void {
        this.props.datasource.getKeys(assetId, topic).then(
            (keys: string[]) => {
                this.keySelectOptions = [];
                for (const key of keys) {
                    this.keySelectOptions.push({label: key, value: key});
                }
                // force the query editor to update so the keys select gets the options
                this.forceUpdate();
            }, (err: any) => {

            }
        );
    }

    render() {
        // load all available assets on render
        this.loadAssets();

        return (
            <div className="gf-form">
                <Select
                    autoFocus={true}
                    placeholder={'Select an asset'}
                    noOptionsMessage={'No assets available'}
                    options={this.assetSelectOptions}
                    value={this.props.query.assetId}
                    onChange={this.onAssetSelectionChange}
                />
                <Select
                    disabled={!this.props.query.assetId}
                    placeholder={'Select a topic'}
                    noOptionsMessage={'No topics found'}
                    options={this.topicsSelectOptions}
                    value={this.props.query.topic}
                    onChange={this.onTopicSelectionChange}
                />
                <Select
                    disabled={!this.props.query.topic}
                    placeholder={'Select a data key'}
                    noOptionsMessage={'No data keys found'}
                    options={this.keySelectOptions}
                    value={this.props.query.dataKey}
                    onChange={this.onKeySelectionChange}
                />
            </div>
        );
    }

    onAssetSelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query} = this.props;
        if (event.value) {
            onChange({...query, assetId: event.value, asset: event.asset});
            this.loadTopics(event.value);
            // executes the query
            // onRunQuery();
        }
    };

    onTopicSelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query} = this.props;
        if (event.value) {
            onChange({...query, topic: event.value});
            this.loadKeys(query.assetId, event.value);
            // executes the query
            // onRunQuery();
        }
    };

    onKeySelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query, onRunQuery} = this.props;
        if (event.value) {
            onChange({...query, dataKey: event.value});
            // this.loadKeys(query.assetId, event.value);
            // executes the query
            onRunQuery();
        }
    };
}
