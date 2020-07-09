import { UpsAdminClient } from '@aerogear/unifiedpush-admin-client';

export abstract class UpsClientFactory {
  private static readonly UPS_URL = 'http://localhost:9999';

  private static readonly unifiedPushAdminClient = new UpsAdminClient(
    UpsClientFactory.UPS_URL
  );

  static readonly getUpsClient = () => UpsClientFactory.unifiedPushAdminClient;

  static readonly getUPSServerURL = () => UpsClientFactory.UPS_URL;
}
