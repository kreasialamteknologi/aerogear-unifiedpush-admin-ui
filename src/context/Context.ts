import React from 'react';
import { PushApplication, Variant } from '@aerogear/unifiedpush-admin-client';
import { AlertVariant } from '@patternfly/react-core';

export interface Alert {
  key: number;
  title: string;
  variant: AlertVariant;
  details: string[];
}

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
  alert(message: string, details: string[], type: AlertVariant): Promise<void>;

  // alert: (message:string, details: string[], type: AlertVariant) => void;
  selectVariant: (variant: Variant) => void;
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
  selectVariant: async (variant: Variant) => {},
};

export interface ContextInterface extends UpsAdminState {}

// tslint:disable-next-line:variable-name
export const ApplicationListContext = React.createContext<ContextInterface>(
  defaultState
);
// tslint:disable-next-line:variable-name
export const ApplicationListConsumer = ApplicationListContext.Consumer;
