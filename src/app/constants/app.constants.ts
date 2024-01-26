
export const AppConstants = {
  SERVER_CONFIG: {
    DEVELOPMENT: 'https://tnchampions.proz.in',
    LIVE: 'https://tnchampions1.sdat.in',
  },
};
export function backendUrl() {
  return AppConstants.SERVER_CONFIG.LIVE   //Here we need to change the environemnt.
}
function createUrl(urlName: string) {
  return backendUrl() + '/api' + urlName
}

// https://tnchampions1.sdat.in/api
export const appApiResources = {
  register: createUrl('/signup'),
  login: createUrl('/login'),
  otpVerify: createUrl('/otpvalidation'),
  getUserData: createUrl('/user-data'),
  reachOut: createUrl('/reachout-form'),
  registrationform: createUrl('/registration'),
  Sponsorshipform:createUrl('/registration-update'),
  personaldetails:createUrl('/personaldetails'),
  getFinancialData: createUrl('/manualpayment'),
  getpaymentgateway: createUrl('/paymentgateway'),
  getexpenditurelist: createUrl('/expenditurelist'),
  galleryList :createUrl('/gallerylist'),
  beneficiaryList:createUrl('/beneficiary')
};
