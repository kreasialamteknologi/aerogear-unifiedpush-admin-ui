/*

Config file format:
  {
    UPS_SERVER_URL: 'http://localhost:9999'
  }
 */
import * as axios from 'axios';

interface UpsConfig {
  UPS_SERVER_URL?: string;
  DOCS_LINKS?: Record<string, string>;
  UPS_DISABLED?: string[];
}

const DEFAULT_CONFIG: UpsConfig = {
  UPS_SERVER_URL: 'http://localhost:9999',
  DOCS_LINKS: {
    'create-app':
      'https://aerogear.org/docs/unifiedpush/ups_userguide/index/#_create_and_manage_pushapplication',
    'add-variant':
      'https://aerogear.org/docs/unifiedpush/ups_userguide/index/#_create_and_manage_variants',
    'step-by-step-android':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/',
    'step-by-step-ios':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-ios/guides/',
    'register-device-android':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/#_registration_with_the_unifiedpush_server',
    'register-device-ios':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-ios/guides/#_setting_up_the_ios_variant_id',
    'build-and-deploy-android':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-android/guides/#_handling_notification',
    'build-and-deploy-ios':
      'https://aerogear.org/docs/unifiedpush/aerogear-push-ios/guides/#_test_the_app_on_your_device',
    'sender-api': 'https://aerogear.org/docs/specs/#push',
    'sender-api-java':
      'https://aerogear.org/docs/specs/aerogear-unifiedpush-java-client/',
    'sender-api-nodejs':
      'https://www.npmjs.com/package/unifiedpush-node-sender',
    'sender-api-rest':
      'https://aerogear.org/docs/specs/aerogear-unifiedpush-rest/index.html',
    'sender-downloads-java': 'https://aerogear.org/getstarted/downloads/#push',
    'sender-downloads-nodejs':
      'https://aerogear.org/getstarted/downloads/#push',
    'sender-step-by-step-java':
      'https://aerogear.org/docs/unifiedpush/GetStartedwithJavaSender/',
    'docs-push-getting-started': 'https://aerogear.org/getstarted/guides/#push',
    'docs-push-ios': 'http://aerogear.org/docs/unifiedpush/aerogear-push-ios/',
    'docs-push-cordova':
      'http://aerogear.org/docs/guides/aerogear-cordova/AerogearCordovaPush/',
    'docs-push-android':
      'http://aerogear.org/docs/unifiedpush/aerogear-push-android/',
    'docs-push-chrome':
      'http://aerogear.org/docs/unifiedpush/aerogear-push-chrome/',
  },
  UPS_DISABLED: undefined,
};

export class Config {
  private async getUPSServerURL(): Promise<string> {
    return (await axios.default.get<string>('/config')).data;
  }

  // private loadConfigFile = (): UpsConfig => {
  //
  // }

  readonly loadConfig = async (): Promise<UpsConfig> => {
    return { UPS_SERVER_URL: await this.getUPSServerURL() };
  };
}
