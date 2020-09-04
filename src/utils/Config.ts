import * as axios from 'axios';
import { UpsClientFactory } from './UpsClientFactory';

export interface UpsConfig {
  DOCS_LINKS?: Record<string, string>;
  UPS_DISABLED?: string[];
}

export class Config {
  private upsConfig?: UpsConfig;
  private static instance?: Config;

  static readonly getUPSServerURL = async (): Promise<string> =>
    (await axios.default.get<string>('/config.txt')).data;

  static readonly getInstance = () => {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  };

  readonly getDocsConfig = async (): Promise<UpsConfig> => {
    if (!this.upsConfig) {
      await UpsClientFactory.init();
      this.upsConfig = await UpsClientFactory.getUpsClient()
        .config.ui.get()
        .execute();
    }
    return this.upsConfig;
  };
}
