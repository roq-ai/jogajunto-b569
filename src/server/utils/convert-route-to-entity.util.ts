const mapping: Record<string, string> = {
  courts: 'court',
  matches: 'match',
  organizations: 'organization',
  reviews: 'review',
  schedules: 'schedule',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
