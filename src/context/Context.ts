import React from 'react';
import {PushApplication, Variant} from '@aerogear/unifiedpush-admin-client';
import {AlertVariant} from '@patternfly/react-core';
import {Alert} from '../utils/Alerts';
import {UpsConfig} from '../utils/Config';

export interface UpsAdminState {
  //the current page being viewed
  applications: PushApplication[];

  selectedVariant?: Variant;
  //total number of applications on the server
  total: number;
  loading: boolean;

  error?: string;
  refresh: (page?: number) => void;
  alerts: Alert[];

  alert(err: Error): Promise<void>;
  alert(
    message: string,
    details: string[],
    type: AlertVariant,
    timeout?: number
  ): Promise<void>;

  selectVariant: (variant: Variant) => void;

  authConfig: Record<string, string>;
  upsConfig: UpsConfig;
}

const defaultState: UpsAdminState = {
  applications: [],
  selectedVariant: undefined,
  total: 0,
  loading: false,
  error: undefined,
  refresh: () => {},
  alert: async (): Promise<void> => {
    return;
  },
  alerts: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectVariant: async (variant: Variant) => {},
  authConfig: {},
  upsConfig: {},
};

export type ContextInterface = UpsAdminState;

// tslint:disable-next-line:variable-name
export const ApplicationListContext = React.createContext<ContextInterface>(
  defaultState
);
// tslint:disable-next-line:variable-name
export const ApplicationListConsumer = ApplicationListContext.Consumer;
