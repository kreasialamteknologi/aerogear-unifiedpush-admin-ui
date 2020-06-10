import React, { ReactNode } from 'react';
import { PageSection } from '@patternfly/react-core';

interface PSProps {
  children: ReactNode;
}
// tslint:disable-next-line:variable-name
export const LightPageSection = ({ children }: PSProps) => {
  return <PageSection variant={'light'}>{children}</PageSection>;
};
