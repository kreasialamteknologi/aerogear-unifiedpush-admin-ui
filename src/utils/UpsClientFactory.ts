import { UnifiedPushAdminClient } from '@aerogear/unifiedpush-admin-client';

export abstract class UpsClientFactory {
  private static readonly unifiedPushAdminClient = new UnifiedPushAdminClient(
    'http://localhost:9999'
  );

  static readonly getUpsClient = () => UpsClientFactory.unifiedPushAdminClient;
}
