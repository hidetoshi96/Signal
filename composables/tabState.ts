export const useSelectedTab = () =>
  useState<string>('selectedTab', () => '誰でも');
