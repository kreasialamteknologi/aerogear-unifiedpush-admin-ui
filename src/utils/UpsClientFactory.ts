import { UpsAdminClient } from '@aerogear/unifiedpush-admin-client';
import { KeycloakCredentials } from '@aerogear/unifiedpush-admin-client/dist/src/credentials';

export abstract class UpsClientFactory {
  private static readonly UPS_URL = 'http://localhost:9999';

  private static unifiedPushAdminClient = new UpsAdminClient(
    UpsClientFactory.UPS_URL
  );

  static readonly configureAuth = (conf: KeycloakCredentials) => {
    UpsClientFactory.unifiedPushAdminClient = new UpsAdminClient(
      UpsClientFactory.UPS_URL,
      conf
    );
  };

  static readonly getUpsClient = () => UpsClientFactory.unifiedPushAdminClient;

  static readonly getUPSServerURL = () => UpsClientFactory.UPS_URL;
}
