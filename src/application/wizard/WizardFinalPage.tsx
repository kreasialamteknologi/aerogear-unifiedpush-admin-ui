import React from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { CheckSquareIcon } from '@patternfly/react-icons';

interface Props {
  onClose: () => void;
}

export function WizardFinalPage(props: Props) {
  return (
    <EmptyState>
      <EmptyStateIcon icon={CheckSquareIcon} />
      <Title headingLevel="h4" size="lg">
        Congratulations! you have created an app
      </Title>
      <EmptyStateBody>
        Now go ahead and add more variants, send test notifications and create
        more applications!
      </EmptyStateBody>
      <Button variant="primary" onClick={props.onClose}>
        Close this wizard
      </Button>
    </EmptyState>
  );
}
