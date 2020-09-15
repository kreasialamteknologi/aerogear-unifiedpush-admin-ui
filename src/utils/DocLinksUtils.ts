import { UpsConfig } from './Config';

export interface VariantData {
  name: string;
  label: string;
  description: string;
  checked?: boolean;
}

export const getLink = (
  docLinks: UpsConfig | undefined,
  key: string,
  section = 'DOCS_LINKS',
  defaultLink = '#'
) => {
  const docLinksRecord = docLinks as Record<string, Record<string, string>>;

  return docLinksRecord?.[section]?.[key] || defaultLink;
};

export const getEnabledVariants = (
  config: UpsConfig,
  checkFirst = true
): VariantData[] => {
  const supportedVariants: VariantData[] = [
    {
      name: 'android',
      label: 'android',
      description: 'using Firebase Cloud Messaging',
    },
    {
      name: 'web_push',
      label: 'webpush',
      description: 'using web browsers',
    },
    {
      name: 'ios_token',
      label: 'iOS(APNS Token)',
      description: 'using Apple Push Network with Tokens',
    },
    {
      name: 'ios',
      label: 'iOS(Certificate)',
      description: 'using Apple Push Network with certificates',
    },
  ];

  const isDisabled = (variantType: string): boolean =>
    !!config.UPS_DISABLED?.find(
      disabledVariant => disabledVariant === variantType
    );

  return supportedVariants.reduce((prev: VariantData[], curr: VariantData) => {
    if (!isDisabled(curr.name)) {
      prev.push(curr);
      if (checkFirst && prev.length === 1) {
        prev[0].checked = true;
      }
    }
    return prev;
  }, []);
};
