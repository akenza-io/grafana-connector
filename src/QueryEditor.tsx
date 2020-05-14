import React, { PureComponent } from 'react';
import { Select } from '@grafana/ui';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { DataSource } from './DataSource';
import { Asset } from './types/AkenzaTypes';
import { AkenzaDataSourceConfig, AkenzaQuery } from './types/PluginTypes';
import { QueryEditorState } from './types/Utils';

type Props = QueryEditorProps<DataSource, AkenzaQuery, AkenzaDataSourceConfig>;

export class QueryEditor extends PureComponent<Props, QueryEditorState> {
    private loadingAssets = false;
    private loadingTopics = false;
    private loadingDataKeys = false;
    private dataSourceId: number = Number.NEGATIVE_INFINITY;

    constructor(props: Props) {
        super(props);
        const query = this.props.query;
        // initialize the selects
        this.state = {
            assetSelect: {
                value: query.assetId,
                options: [{label: query.asset?.name || undefined, value: query.assetId, asset: query.asset}]
            },
            topicSelect: {
                value: query.topic,
                options: [{label: query.topic, value: query.topic}]
            },
            dataKeySelect: {
                value: query.dataKey,
                options: [{label: query.dataKey, value: query.dataKey}]
            },
        }
        // load topics and queries if the panel has been saved
        if (query.assetId && query.topic) {
            this.loadTopics(query.assetId);
            this.loadKeys(query.assetId, query.topic);
        }
    }

    private loadAssets(): void {
        // render() is called multiple times, in order to avoid spam calling our API this check has been put into place
        if (!this.loadingAssets && this.dataSourceId != this.props.datasource.id) {
            this.loadingAssets = true;
            this.dataSourceId = this.props.datasource.id;
            this.props.datasource.getAssets().then(
                (assets: Asset[]) => {
                    const assetSelectOptions: Array<SelectableValue<string>> = [];
                    for (const asset of assets) {
                        assetSelectOptions.push({label: asset.name, value: asset.id, asset: asset});
                    }
                    this.setState({
                        assetSelect: {
                            value: undefined,
                            options: assetSelectOptions,
                        }
                    });
                    this.loadingAssets = false;
                    // initial render sometimes does not update the select, hence the force update
                    this.forceUpdate();
                },
                (err: any) => {
                    this.loadingAssets = false;
                }
            );
        }
    }

    private loadTopics(assetId: string): void {
        this.loadingTopics = true;
        this.props.datasource.getTopics(assetId).then(
            (topics: string[]) => {
                let topicsSelectOptions: Array<SelectableValue<string>> = [];
                for (const topic of topics) {
                    topicsSelectOptions.push({label: topic, value: topic});
                }
                this.loadingTopics = false;
                this.setState(prevState => ({
                    ...prevState,
                    topicSelect: {
                        value: undefined,
                        options: topicsSelectOptions,
                    }
                }));
            },
            (err: any) => {
                this.loadingTopics = false;
            }
        )
    }

    private loadKeys(assetId: string, topic: string): void {
        this.loadingDataKeys = true;
        this.props.datasource.getKeys(assetId, topic).then(
            (keys: string[]) => {
                let keySelectOptions: Array<SelectableValue<string>> = [];
                for (const key of keys) {
                    keySelectOptions.push({label: key, value: key});
                }
                this.loadingDataKeys = false;
                this.setState(prevState => ({
                    ...prevState,
                    dataKeySelect: {
                        value: undefined,
                        options: keySelectOptions,
                    }
                }));
            }, (err: any) => {
                this.loadingDataKeys = false;
            }
        );
    }

    render() {
        const {assetSelect, topicSelect, dataKeySelect} = this.state;
        // load all available assets on render
        this.loadAssets();

        return (
            <div className="gf-form">
                <Select
                    autoFocus={true}
                    isLoading={this.loadingAssets}
                    prefix={'Asset:'}
                    placeholder={'Select an asset'}
                    noOptionsMessage={'No assets available'}
                    options={assetSelect.options}
                    value={assetSelect.value}
                    backspaceRemovesValue={true}
                    onChange={this.onAssetSelectionChange}
                />
                <Select
                    disabled={!this.props.query.assetId}
                    isLoading={this.loadingTopics}
                    prefix={'Topic:'}
                    placeholder={'Select a topic'}
                    noOptionsMessage={'No topics found'}
                    options={topicSelect.options}
                    value={topicSelect.value}
                    backspaceRemovesValue={true}
                    onChange={this.onTopicSelectionChange}
                />
                <Select
                    disabled={!this.props.query.topic}
                    isLoading={this.loadingDataKeys}
                    prefix={'Data Key:'}
                    placeholder={'Select a data key'}
                    noOptionsMessage={'No data keys found'}
                    options={dataKeySelect.options}
                    value={dataKeySelect.value}
                    backspaceRemovesValue={true}
                    onChange={this.onKeySelectionChange}
                />
            </div>
        );
    }

    onAssetSelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query} = this.props;
        onChange({
            ...query,
            assetId: event.value || '',
            asset: event.asset
        });
        if (event.value) {
            this.loadTopics(event.value);
        }
    };

    onTopicSelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query} = this.props;
        onChange({
            ...query,
            topic: event.value || ''
        });
        if (event.value) {
            this.loadKeys(query.assetId, event.value);
        }
    };

    onKeySelectionChange = (event: SelectableValue<string>): void => {
        const {onChange, query, onRunQuery} = this.props;
        onChange({
            ...query,
            dataKey: event.value || ''
        });
        if (event.value && this.props.query.assetId && this.props.query.topic) {
            // executes the query
            onRunQuery();
        }
    };

}
