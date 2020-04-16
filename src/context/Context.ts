import React from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';

export interface UpsAdminState {
  applications: PushApplication[];
  loading: boolean;
  error?: string;
  refresh: () => void;
}

const defaultState: UpsAdminState = {
  applications: [],
  loading: false,
  error: undefined,
  refresh: () => {},
};

// tslint:disable-next-line:variable-name
export const ApplicationListContext = React.createContext<UpsAdminState>(
  defaultState
);
// tslint:disable-next-line:variable-name
export const ApplicationListConsumer = ApplicationListContext.Consumer;
