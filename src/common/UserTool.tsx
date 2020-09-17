import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownToggle } from '@patternfly/react-core';
import { CaretDownIcon, UserIcon } from '@patternfly/react-icons';
import { useKeycloak } from '@react-keycloak/web';

interface State {
  isOpen: boolean;
}

export function UserTool() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { keycloak } = useKeycloak();
  const [username, setUsername] = useState<string>('unknown');

  useEffect(() => {
    loadProfile();
  });

  const loadProfile = async () => {
    const userProfile = await keycloak?.loadUserProfile();
    setUsername(userProfile?.username || 'unknown');
  };

  if (!keycloak) {
    return null;
  }

  return (
    <Dropdown
      isOpen={isOpen}
      isPlain
      onSelect={() => setIsOpen(!isOpen)}
      toggle={
        <DropdownToggle
          onToggle={(open: boolean) => setIsOpen(open)}
          toggleIndicator={CaretDownIcon}
          id="toggle-id-4"
        >
          <UserIcon />
          &nbsp;{username}
        </DropdownToggle>
      }
      dropdownItems={[
        <DropdownItem key="link" onClick={() => keycloak?.logout()}>
          Logout
        </DropdownItem>,
      ]}
    ></Dropdown>
  );
}
