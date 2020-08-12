import React, { Component } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  AlertVariant,
  Page,
  PageSection,
} from '@patternfly/react-core';
import { Welcome } from './landing';
import { Header } from './common/Header';

import { ApplicationListContext, UpsAdminState } from './context/Context';
import { UpsClientFactory } from './utils/UpsClientFactory';

import './styles/App.scss';
import { UpsError } from '@aerogear/unifiedpush-admin-client/dist/src/errors/UpsError';
import { Variant } from '@aerogear/unifiedpush-admin-client';

export class App extends Component<{}, UpsAdminState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      applications: [],
      total: 0,
      loading: true,
      refresh: this.refresh,
      alert: this.alert,
      alerts: [],
      selectVariant: this.selectVariant,
    };
  }

  private readonly alert = async (
    messageOrError: string | Error,
    details?: string[],
    type?: AlertVariant
  ): Promise<void> => {
    if (messageOrError instanceof Error) {
      if (messageOrError instanceof UpsError) {
        const error: UpsError = messageOrError;
        const errorDetails = error.details() ?? {};
        return this.setState({
          alerts: [
            {
              key: new Date().getTime(),
              details: Object.keys(errorDetails).map(
                key => `${key} : ${errorDetails[key]}`
              ),
              title: messageOrError.message,
              variant: AlertVariant.danger,
            },
          ],
        });
      }
      return this.setState({
        alerts: [
          {
            key: new Date().getTime(),
            details: [],
            title: messageOrError.message,
            variant: AlertVariant.danger,
          },
        ],
      });
    }

    return this.setState({
      alerts: [
        {
          key: new Date().getTime(),
          details: details!,
          title: messageOrError,
          variant: type!,
        },
      ],
    });
  };

  // private readonly alert = async (message:string, details: string[], type: AlertVariant) => {
  //   return this.setState({alerts: [ ...this.state.alerts, {key: new Date().getTime(), title: message, variant: type, details} ]})
  // }
  //     selectVariant: this.selectVariant,
  //   };
  // }

  private readonly selectVariant = async (variant?: Variant) => {
    return this.setState({ selectedVariant: variant });
  };

  private readonly refresh = async (currentPage = 0) => {
    try {
      const searchResults = await UpsClientFactory.getUpsClient()
        .applications.search()
        .page(currentPage)
        .execute();
      this.setState({
        applications: searchResults.list,
        total: searchResults.total,
        loading: false,
        error: undefined,
      });
    } catch (err) {
      await this.alert(err.message, [], AlertVariant.danger);
      this.setState({
        applications: [],
        loading: false,
        error: err,
      });
    }
  };

  async componentDidMount() {
    this.refresh();
  }

  private readonly removeAlert = (key: number) => {
    this.setState({
      alerts: [...this.state.alerts.filter(el => el.key !== key)],
    });
  };

  render = (): React.ReactElement => (
    <ApplicationListContext.Provider value={this.state}>
      <AlertGroup isToast>
        {this.state.alerts.map(({ key, variant, title, details }) => (
          <Alert
            isLiveRegion
            variant={AlertVariant[variant]}
            title={title}
            actionClose={
              <AlertActionCloseButton
                title={title}
                variantLabel={`${variant} alert`}
                onClose={() => this.removeAlert(key)}
              />
            }
            key={key}
          >
            {details.length === 0 ? null : (
              <ul>
                {details.map(detail => (
                  <p>{detail}</p>
                ))}
              </ul>
            )}
          </Alert>
        ))}
      </AlertGroup>
      <Page
        header={<Header />}
        style={{ flexGrow: 1, flexDirection: 'column' }}
      >
        <PageSection
          isFilled={true}
          variant={'light'}
          style={{ padding: '0 0 0 0' }}
        >
          <Welcome />
        </PageSection>
      </Page>
    </ApplicationListContext.Provider>
  );
}

// tslint:disable-next-line:no-default-export
export default App;
