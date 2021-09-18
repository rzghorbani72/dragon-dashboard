import { combineReducers } from 'redux';
import getDashboard from './dashboard/reducer';
import getSnackbar from './snackbar/reducer';
import getModal from './modal/reducer';
import getUser from './user/reducer';
import getHeader from './header/reducer';
import getProducts from './products/reducer';
import getPods from './pods/reducer';
import getHome from './home/reducer';
import getTransactions from './transactions/reducer';
import getAccessLevels from './accessLevels/reducer';
import getCustomers from './customers/reducer';
import getJumps from './jumps/reducer';
import getCamps from './compaigns/reducer';
import getMarketing from './marketing/reducer';
import getBackup from './backup/reducer';
import getReports from './reports/reducer';
import getMerchantProducts from './merchantProducts/reducer';
import getVipBonus from './vipBounus/reducer';
import getTable from './table/reducer';
import getLoader from './loader/reducer';
import getDiscounts from './storeManagementDiscount/reducer';
import getShipping from './storeManagementShipping/reducer';
import getOnlineStore from './onlineStore/reducer';
// import getPayment from './storeManagementPayment/reducer';
import getTickets from './tickets/reducer';
import getPacking from './storeManagementPacking/reducer';
import getStoreMakerOrders from './storeMakerOrders/reducer';
import getTour from './tour/reducer';
import getCategories from './storeManagementCategories/reducer';
import getNotifications from './notification/reducer';
import getStoreMakerVariant from './storeManagementVariant/reducer';
import getStoreMakerTag from './storeManagementTag/reducer';
import getStorePersonalize from './personalize/reducer';
import getUserInfoStore from './userInfoStore/reducer';
import getStoreCollections from './storeCollections/reducer';
import getPackageList from './packageList/reducer';
import getPurchasePackage from './purchasePackage/reducer';
import getSelectedStore from './selectedStore/reducer';
import getStoreStaff from './storeStaff/reducer';
import getPodPackage from './podPackage/reducer';
import getPreInvoice from './preInvoice/reducer';
import getStoreUnits from './storeManagementUnit/reducer';
import getVoucher from './voucher/reducer';
import getRoles from './roles/reducer';
import getStaffReport from './staffReport/reducer';
import getVoucherDiscount from './storeManagementVoucher/reducer';
import getAboutUs from './about-us/reducer';
import getLoyaltyHistory from './loayltyHistory/reducer';
import getDirect from './direct/reducer';
import getLoyaltySettings from './loyaltySettings/reducer';
import getReturns from './onlineStoreReturns/reducer';
import comments from './comments/reducer';
import expirePackage from './expirePackage/reducer';
import gatewayData from './gatewayData/reducer';
import sms from './sms/reducer';
import domain from './domain/reducer';

export default combineReducers({
  dashboard: getDashboard,
  snackbar: getSnackbar,
  modal: getModal,
  gateway: gatewayData,
  user: getUser,
  header: getHeader,
  products: getProducts,
  pods: getPods,
  home: getHome,
  transactions: getTransactions,
  accessLevels: getAccessLevels,
  customers: getCustomers,
  jumps: getJumps,
  camps: getCamps,
  marketing: getMarketing,
  getBackup,
  reports: getReports,
  merchantProducts: getMerchantProducts,
  vipBonus: getVipBonus,
  getTable,
  loader: getLoader,
  discount: getDiscounts,
  shipping: getShipping,
  onlineStore: getOnlineStore,
  tickets: getTickets,
  packing: getPacking,
  storeMakerOrders: getStoreMakerOrders,
  tour: getTour,
  categories: getCategories,
  notifications: getNotifications,
  storeMakerVariant: getStoreMakerVariant,
  storeMakerTags: getStoreMakerTag,
  store: getStorePersonalize,
  userInfoStore: getUserInfoStore,
  collections: getStoreCollections,
  packageList: getPackageList,
  purchasePackage: getPurchasePackage,
  selectedStore: getSelectedStore,
  storeStaff: getStoreStaff,
  podPackage: getPodPackage,
  preInvoice: getPreInvoice,
  units: getStoreUnits,
  voucher: getVoucher,
  roles: getRoles,
  staffReport: getStaffReport,
  voucherDiscount: getVoucherDiscount,
  aboutUs: getAboutUs,
  loyaltyHistory: getLoyaltyHistory,
  direct: getDirect,
  loyaltySettings: getLoyaltySettings,
  returns: getReturns,
  comments: comments,
  expiredPackage: expirePackage,
  sms: sms,
  domain: domain
});
