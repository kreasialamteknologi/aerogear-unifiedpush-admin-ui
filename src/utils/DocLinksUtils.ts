import { UpsConfig } from './Config';

export const getLink = (
  docLinks: UpsConfig | undefined,
  key: string,
  section = 'DOCS_LINKS',
  defaultLink = '#'
) => {
  const docLinksRecord = docLinks as Record<string, Record<string, string>>;

  return docLinksRecord?.[section]?.[key] || defaultLink;
};
