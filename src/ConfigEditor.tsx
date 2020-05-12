import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { AkenzaDataSourceConfig, AkenzaSecureDataSourceConfig } from './types';

const { SecretFormField, FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<AkenzaDataSourceConfig> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onBaseUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      baseUrl: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as AkenzaSecureDataSourceConfig;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Base URL"
            labelWidth={10}
            inputWidth={27}
            onChange={this.onBaseUrlChange}
            value={jsonData.baseUrl || ''}
            placeholder="e.g. https://api.core.akenza.io"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
              value={secureJsonData.apiKey || ''}
              label="API Key"
              placeholder="API Key"
              labelWidth={10}
              inputWidth={27}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
