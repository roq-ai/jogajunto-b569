interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Platform Administrator'],
  customerRoles: [],
  tenantRoles: ['Player', 'Platform Administrator'],
  tenantName: 'Organization',
  applicationName: 'JogaJunto',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage Organizations', 'Invite Players to join the application'],
};
