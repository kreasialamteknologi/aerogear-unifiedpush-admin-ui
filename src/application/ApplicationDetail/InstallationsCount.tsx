import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import { Text, TextVariants } from '@patternfly/react-core';
import React, {
  Component,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UpsClientFactory } from '../../utils/UpsClientFactory';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';

interface Props {
  variant: Variant;
  app: PushApplication;
  autoRefresh?: boolean;
  onNewInstallation?: (app: PushApplication) => void;
  deviceInstalledComponent?: ReactNode;
  deviceNotInstalledComponent?: ReactNode;
}

export function InstallationCount(props: Props) {
  const context = useContext<ContextInterface>(ApplicationListContext);
  const [variant, setVariant] = useState<Variant>(props.variant);

  const defaultDeviceInstalledComponent = (
    <Text
      style={{ paddingLeft: 20, color: '#999' }}
      component={TextVariants.small}
    >
      {`${variant.metadata?.deviceCount} Device${
        variant.metadata?.deviceCount! > 1 ? 's' : ''
      }`}
    </Text>
  );

  const defaultNoInstallationComponent = (
    <Text
      style={{ paddingLeft: 20, color: '#999' }}
      component={TextVariants.small}
    >
      <i style={{ paddingRight: 5 }} className="fas fa-ban" />
      No installation yet
    </Text>
  );

  useEffect(() => {
    if (props.autoRefresh) {
      const interval = setInterval(async () => {
        const updatedApp = (
          await UpsClientFactory.getUpsClient()
            .applications.search()
            .withApplicationID(props.app.pushApplicationID)
            .execute()
        ).list[0];
        const update = updatedApp.variants?.find(
          v => v.variantID === props.variant.variantID
        );

        if (
          update?.metadata?.deviceCount !== 0 &&
          variant.metadata?.deviceCount !== update?.metadata?.deviceCount
        ) {
          const upd = async () => {
            await context.selectVariant(update);
            if (props.onNewInstallation) {
              props.onNewInstallation(updatedApp);
            }
          };
          upd();
        }
        setVariant({ ...variant, ...update });
      }, 3000);
      return () => clearInterval(interval);
    } else {
      return () => {};
    }
  }, []);

  return (
    <>
      {!variant.metadata?.deviceCount
        ? props.deviceNotInstalledComponent || defaultNoInstallationComponent
        : props.deviceInstalledComponent || defaultDeviceInstalledComponent}
    </>
  );
}
