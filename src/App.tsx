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

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Welcome } from './landing';
import { Header } from './common/Header';

import { ApplicationListContext, UpsAdminState } from './context/Context';
import { UpsClientFactory } from './utils/UpsClientFactory';

import { Variant } from '@aerogear/unifiedpush-admin-client';
import { ApplicationDetail } from './application/ApplicationDetail/ApplicationDetail';
import { initKeycloak } from './keycloak';
import { KeycloakTokens, KeycloakProvider } from '@react-keycloak/web';
import { KeycloakInstance } from 'keycloak-js';
import { Loading } from './common/Loading';

import { addAlert, removeAlert } from './utils/Alerts';
import './styles/App.scss';

export class App extends Component<{}, UpsAdminState> {
  private keycloak: KeycloakInstance | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      applications: [],
      total: 0,
      loading: true,
      refresh: this.refresh,
      alert: (
        messageOrError: string | Error,
        details?: string[],
        type?: AlertVariant,
        timeout?: number
      ) => addAlert(messageOrError, this, details, type, timeout),
      alerts: [],
      selectVariant: this.selectVariant,
      authConfig: {},
      upsConfig: {},
    };
  }

  private readonly selectVariant = async (variant?: Variant) => {
    return this.setState({ selectedVariant: variant });
  };

  private readonly refresh = async (currentPage = 0) => {
    try {
      await UpsClientFactory.init();
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
      await this.state.alert(err.message, [], AlertVariant.danger);
      this.setState({
        applications: [],
        loading: false,
        error: err,
      });
    }
  };

  private readonly loadKeycloakConfig = async (): Promise<
    Record<string, string>
  > => {
    return UpsClientFactory.getUpsClient()
      .config.auth.get()
      .execute();
  };

  async componentDidMount() {
    await UpsClientFactory.init();
    const authConfig = await this.loadKeycloakConfig();

    if (authConfig['auth-enabled']) {
      this.keycloak = await initKeycloak();
    } else {
      this.refresh();
    }
    this.setState({
      authConfig,
      upsConfig: await UpsClientFactory.getUpsClient()
        .config.ui.get()
        .execute(),
    });
  }

  render1 = (): React.ReactElement => {
    return (
      <ApplicationListContext.Provider value={this.state}>
        <AlertGroup isToast>
          {this.state.alerts.map(
            ({ key, variant, title, details, timeout }) => (
              <Alert
                isLiveRegion
                variant={AlertVariant[variant]}
                title={title}
                timeout={timeout}
                actionClose={
                  <AlertActionCloseButton
                    title={title}
                    variantLabel={`${variant} alert`}
                    onClose={() => removeAlert(key, this)}
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
            )
          )}
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
            <Router>
              <Route path="/" exact={true} component={Welcome} />
              <Route
                path="/app/:appId"
                render={({ match }) => {
                  return (
                    <ApplicationDetail
                      app={this.state.applications.find(
                        app => app.pushApplicationID === match.params.appId
                      )}
                    />
                  );
                }}
              />
            </Router>
          </PageSection>
        </Page>
      </ApplicationListContext.Provider>
    );
  };

  render = (): React.ReactElement => {
    if (
      !this.state.authConfig ||
      (this.state.authConfig['auth-enabled'] && !this.keycloak)
    ) {
      // render waiting
      return <Loading />;
    }
    if (this.state.authConfig['auth-enabled']) {
      return (
        <KeycloakProvider
          keycloak={this.keycloak!}
          initConfig={{
            onLoad: 'login-required',
            checkLoginIframe: false,
          }}
          LoadingComponent={<Loading />}
          onTokens={(tokens: KeycloakTokens) => {
            console.log({ tokens });
            UpsClientFactory.configureAuth({
              type: 'keycloak',
              token: tokens.token,
              kcUrl: this.state.authConfig['auth-server-url'],
              realm: this.state.authConfig.realm,
              client_id: this.state.authConfig.resource,
            });
            this.refresh();
          }}
        >
          {this.render1()}
        </KeycloakProvider>
      );
    }

    return this.render1();
  };
}

// tslint:disable-next-line:no-default-export
export default App;
