import { Component } from 'react';
import { AlertVariant } from '@patternfly/react-core';
import { UpsError } from '@aerogear/unifiedpush-admin-client/dist/src/errors/UpsError';

export interface Alert {
  key: number;
  title: string;
  variant: AlertVariant;
  details: string[];
}

interface Alerts {
  alerts: Alert[];
}

export const addAlert = async (
  messageOrError: string | Error,
  owner: Component<unknown, Alerts>,
  details?: string[],
  type?: AlertVariant
): Promise<void> => {
  if (messageOrError instanceof Error) {
    if (messageOrError instanceof UpsError) {
      const error: UpsError = messageOrError;
      const errorDetails = error.details() ?? {};
      return owner.setState({
        alerts: [
          {
            key: new Date().getTime(),
            details: Object.keys(errorDetails).map(
              key => `${key} : ${errorDetails[key]}`
            ),
            title: messageOrError.message,
            variant: AlertVariant.danger,
          },
        ],
      });
    }
    return owner.setState({
      alerts: [
        {
          key: new Date().getTime(),
          details: [],
          title: messageOrError.message,
          variant: AlertVariant.danger,
        },
      ],
    });
  }

  return owner.setState({
    alerts: [
      {
        key: new Date().getTime(),
        details: details!,
        title: messageOrError,
        variant: type!,
      },
    ],
  });
};

export const removeAlert = (key: number, owner: Component<unknown, Alerts>) =>
  owner.setState({
    alerts: [...owner.state.alerts.filter(el => el.key !== key)],
  });
