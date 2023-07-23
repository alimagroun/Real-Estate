import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
  //  title: true
  },
  {
    name: 'Buy',
    url: '/propertysearch',
    linkProps: { queryParams: { 'status': 'sale' } }
  },
  {
    name: 'Rent',
    url: '/propertysearch',
    linkProps: { queryParams: { 'status': 'rent' } }
  },
  {
    name: 'Sell',
    url: '/addproperty',
  },
  {
    name: 'Contact us',
    url: '/contactus',
  },

]

