import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import { MobileAltIcon, PlusIcon } from '@patternfly/react-icons';
import { Config, UpsConfig } from '../../../utils/Config';
import { getLink } from '../../../utils/DocLinksUtils';

interface Props {
  app?: PushApplication;
  onCreateNew: () => void;
}

export function NoVariantsPanel(props: Props) {
  const [docLinks, setDocLinks] = useState<UpsConfig | undefined>(undefined);

  useEffect(() => {
    (async () => setDocLinks(await Config.getInstance().getDocsConfig()))();
  });

  const noVariants = () => (
    <EmptyState variant={EmptyStateVariant.full}>
      <EmptyStateIcon icon={MobileAltIcon} />
      <Title headingLevel="h4" size="lg">
        There are no variants yet.
      </Title>
      <EmptyStateBody>
        The first step to set up your mobile device is to add a variants. That
        will generate the code necessary to register UPS on your device.
        <br />
        Learn more about variants in the{' '}
        <a href={getLink(docLinks, 'add-variant')}>documentation</a>.
      </EmptyStateBody>
      <Button variant="primary" icon={<PlusIcon />} onClick={props.onCreateNew}>
        Add A Variant
      </Button>
    </EmptyState>
  );

  return props.app?.variants?.length && props.app.variants.length > 0
    ? null
    : noVariants();
}
