import { UpsAdminClient } from '@aerogear/unifiedpush-admin-client';
import { KeycloakCredentials } from '@aerogear/unifiedpush-admin-client/dist/src/credentials';
import { Config } from './Config';

export abstract class UpsClientFactory {
  private static UPS_URL: string | undefined;

  private static unifiedPushAdminClient = new UpsAdminClient(
    UpsClientFactory.UPS_URL!
  );

  static readonly getUpsClient = () => UpsClientFactory.unifiedPushAdminClient;

  static readonly getUPSServerURL = () => UpsClientFactory.UPS_URL!;

  static readonly isInitialized = (): boolean => !!UpsClientFactory.UPS_URL;

  static readonly configureAuth = (conf: KeycloakCredentials) => {
    UpsClientFactory.unifiedPushAdminClient = new UpsAdminClient(
      UpsClientFactory.UPS_URL!,
      conf
    );
  };

  static readonly init = async () => {
    if (UpsClientFactory.isInitialized()) {
      return;
    }

    UpsClientFactory.UPS_URL = await Config.getUPSServerURL();
    UpsClientFactory.unifiedPushAdminClient = new UpsAdminClient(
      UpsClientFactory.UPS_URL!
    );
  };
}
