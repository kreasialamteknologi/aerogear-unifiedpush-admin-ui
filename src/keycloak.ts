import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { UpsClientFactory } from './utils/UpsClientFactory';

const loadKeycloakConfig = async (): Promise<Record<string, string>> => {
  return UpsClientFactory.getUpsClient()
    .config.auth.get()
    .execute();
};

let keycloak: KeycloakInstance | null = null;

export const initKeycloak = async (): Promise<KeycloakInstance> => {
  if (keycloak === null) {
    const authConfig = await loadKeycloakConfig();
    keycloak = Keycloak({
      realm: authConfig.realm,
      url: authConfig['auth-server-url'],
      clientId: authConfig['resource'],
    });
  }
  console.log('returning', keycloak);
  return keycloak;
};
