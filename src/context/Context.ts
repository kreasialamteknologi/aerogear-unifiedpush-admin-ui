import React from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';

export interface UpsAdminState {
  //the current page being viewed
  applications: PushApplication[];
  //total number of applications on the server
  total: number;
  loading: boolean;
  error?: string;
  refresh: (page?: number) => void;
}

const defaultState: UpsAdminState = {
  applications: [],
  total: 0,
  loading: false,
  error: undefined,
  refresh: () => {},
};

export interface ContextInterface extends UpsAdminState {}

// tslint:disable-next-line:variable-name
export const ApplicationListContext = React.createContext<ContextInterface>(
  defaultState
);
// tslint:disable-next-line:variable-name
export const ApplicationListConsumer = ApplicationListContext.Consumer;
