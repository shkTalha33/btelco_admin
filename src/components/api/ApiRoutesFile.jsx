// admin apis
const login = "/login"
const blogCrud = "/blogs"
const headerCrud = "/header"
const blogCategoryCrud = "/blog/category"
const serviceCategoryCrud = "/service/category"
const serviceCrud = "/service"
const landingServiceCrud = "/landing/service"
const staticCrud = "/static/page"

const createAdmin = "users/admin/company-admin/"
const checkAdminEmail = "users/admin/check-email"

// package apis
const createPackage = "package/create"
const getPackages = "package/all"
const editPackage = "package/edit/"
const deletePackage = "package/"

// firm apis
const getCompanies = "users/admin/company"
const imageUpload = "image/upload"
const createFirm = "users/admin/add-firm"
const updateFirm = "users/admin/edit-firm/"
const checkFirmPhone = "users/check-phone"
const checkFirmEmail = "/users/check-email"

// staff apis
const staffLogin = "auth/staff"
const addStaff = "users/admin/add-staff"
const getStaff = "users/admin/staff/"
const updateStaff = "users/admin/staff-update/"
const checkStaffEmail = "users/admin/check-email"

// Faqs Apis
const faqCreate = 'landingpage/faqs'
const faqEdit = 'landingpage/faqs/'
const faqDelete = 'landingpage/faqs/'
const faqGet = 'landingpage/faqs/'

// email configure apis
const emailConfigureCreate = "email-conf/save"
const emailConfigureSend = "email-conf/send"
const emailConfigureGet = "email-conf"


/// dashboard data
const getDashboardData = 'users/admin/dashboard/'

// chat api start
const getAllConversation = "/msg/conversations";
const getUserMessages = "/msg/messages";
const seenMessage = "/seen-msg";


//payment api
const getCompaniesSubscriptions = 'users/admin/company-subscriptions'
const getSubscriptionsTransitions = '/users/admin/subscriptions-transactions'
const subscriptionCount = '/users/admin/subscription-counts'




const privacyPages = 'pages'
const faqCat = 'landingpage/faqcat'
const createSupport = 'support/create'
const getSupports = 'support/admin'
const attendSupport = 'support/attended'


export {
  getAllConversation, getUserMessages, seenMessage, privacyPages, faqCat, createSupport, getSupports, attendSupport, createPackage, getPackages, editPackage, deletePackage, getCompanies, imageUpload, createFirm, updateFirm, checkFirmPhone, checkFirmEmail, checkAdminEmail, createAdmin, addStaff, getStaff, updateStaff, staffLogin, checkStaffEmail, faqCreate, faqEdit, faqDelete, faqGet, emailConfigureCreate, emailConfigureSend, emailConfigureGet, getDashboardData, getCompaniesSubscriptions, getSubscriptionsTransitions, subscriptionCount,
  blogCrud, headerCrud, login, blogCategoryCrud, serviceCategoryCrud, serviceCrud, staticCrud, landingServiceCrud
}