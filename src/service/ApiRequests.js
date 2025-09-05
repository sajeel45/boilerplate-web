import { APIurls } from "../constants.js";
import apiService from ".";
import multipart from "./multipart.js";

export const ApiRequests = {
  //user Authentication
  login: async (data) => await apiService.post(APIurls.auth + "/login", data,),
  logout: async (data) => await apiService.post(APIurls.auth + "/logout", data),
  logoutAllDevices: async (data) => await apiService.post(APIurls.auth + "/logout-all-devices", data),
  register: async (data) => await apiService.post(APIurls.auth + "/register", data),
  forgotpassword: async (data) => await apiService.post(APIurls.auth + "/forgot-password", data),
  resetPassword: async (data) => await apiService.post(APIurls.auth + "/reset-password", { password: data.password }, {
    params: {
      token: data.token
    }
  }),
  updatePassword: async (data) => await apiService.post(APIurls.auth + "/update-password", data),
  authenticate: async (params) => await apiService.get(APIurls.auth + "/authenticate",{params}),
  refreshToken: async (data) => await apiService.post(APIurls.auth  + "/refresh-tokens", data),
  updateProfile: async (data) => await apiService.patch(APIurls.auth + "/profile", data),
  linkGoogle: async (data) => await apiService.get(APIurls.auth + "/connect-google"),
  verifyEmail: async (token) => await apiService.get(APIurls.auth + "/verify-email", { params: { access_token: token, type: 'VERIFY_EMAIL' } }),
  sendVerificationLink: async () => await apiService.post(APIurls.auth + "/send-verification-email"),
  verifyTokenExpiry: async () => await apiService.get(APIurls.auth + "/verify-token-expiry"),
  //user Authentication
    
  // campaign routes
  getCampaignForPortal : async (params) => await apiService.get(APIurls.campaign + '/portal-campaign', { params }),
  updateCampaignCount : async (id) => await apiService.patch(APIurls.campaign + `/update-count/${id}`),
  updateCampaignViews : async (id) => await apiService.patch(APIurls.campaign + `/update-views/${id}`),
  updateCampaignById: async (id, data) => await apiService.patch(APIurls.campaign + `/update/${id}`, { data }),

  // campaign routes

  // creator routes
  getCreator: async (id) => await apiService.get(APIurls.creator + `/${id}`),
  getCreators: async (params) => await apiService.get(APIurls.creator, { params }),
  getCreatorDetails: async (id) => await apiService.get(APIurls.creator + `/${id}/details`),
  deleteCreator: async () => await apiService.delete(APIurls.creator),
  getCreatorProfileAnalytics : async (id,params) => await apiService.get(APIurls.creator + '/profile-stats/' + id, {params}),
  updateCreator: async (data) => await apiService.patch(APIurls.creator + `/profile`, data),
  updateCreatorAvatar : async(id,data) => await multipart.patch(APIurls.creator + `/${id}` + "/avatar", data),  
  reloadCreatorStats : async(id) => await apiService.patch(APIurls.creator + `/${id}/reload-stats`),  
  checkNotificationSettings : async() => await apiService.post(APIurls.creator + `/check-notification-settings`),  
  // creator routes


  // Invitations
  getInvitations: async (params) => await apiService.get(APIurls.invitations, { params }),
  getJobInvitation : async (id) => await apiService.get(APIurls.invitations + `/job/${id}`),
  acceptInvitation: async (id,data) => await apiService.patch(APIurls.invitations + `/accept/${id}`,data),
  rejectInvitation : async (data) => await apiService.patch(APIurls.invitations + `/reject`, data),
  getInvitationsCount : async (params) => await apiService.get(APIurls.invitations + `/count`, { params }),
  rejectInviteFromBrand : async (data) => await apiService.patch(APIurls.invitations + `/reject-invite`, data),

  // Invitations

  // payment  
  connectAccount: async (data) => await apiService.post(APIurls.payment + "/account", data),
  getConnectedAccount: async (id) => await apiService.get(APIurls.payment + "/account"+ `/${id}`),
  accountOnboarding: async (id) => await apiService.post(APIurls.payment + "/account"+ `/${id}`),
  disConnectAccount : async(id) => await apiService.patch(APIurls.payment + '/disconnect' + `/${id}`),
  createDashboardLink : async(data) => await apiService.post(APIurls.payment + '/account-link',data),
  getCreatorTransactions : async (params) => await apiService.get(APIurls.payment + '/auth/payouts', {params }),
  getCreatorTransaction : async (id, params) => await apiService.post(APIurls.payment + '/auth/payouts/download'),  
  downloadSingleTransaction : async (id,params) => await apiService.post(APIurls.payment + `/auth/payouts/download/${id}`,params),
  // payment

  // jobs
  getJobs: async (params) => await apiService.get(APIurls.jobs, { params }),
  getMyJobRelated: async (params) => await apiService.get(APIurls.jobs + "/auth/related", { params }),
  getAvailableJobs: async (params) => await apiService.get(APIurls.jobs + "/available", { params }),
  getRecommendedJobs: async (params) => await apiService.get(APIurls.jobs + "/recommended", { params }),    
  getJobDetails: async (id) => await apiService.get(APIurls.jobs + `/${id}/details`),
  verifyJobInvitation : async (id) => await apiService.get(APIurls.jobs + `/${id}/verify-invitation`),
  // jobs
  
  // brands
  getBrands: async (params) => await apiService.get(APIurls.brand, { params }),
  getAvailableJobsByBrand: async (id, params) => await apiService.get(APIurls.brand + `/${id}/jobs/available`, { params }),
  getBrand : async (id) => await apiService.get(APIurls.brand + `/${id}`),
  getRecentJobs : async (id) => await apiService.get(APIurls.brand + `/${id}` + '/recentJobs'),
  // brands
  

  // application
  applyJob: async (id, data) => await apiService.post(APIurls.applications, { jobId: id, ...data }),
  getApplications: async (params) => await apiService.get(APIurls.applications, { params }),
  getMyApplications: async (params) => await apiService.get(APIurls.applications + "/auth", { params }),
  getMyAllApplications: async (params) => await apiService.get(APIurls.applications + "/auth/all", { params }),
  getApplication: async (id) => await apiService.get(APIurls.applications + `/${id}`),
  getApplicationWithStats: async (id) => await apiService.get(APIurls.applications + `/${id}/track`),
  updateApplication: async ({ id, data }) => await apiService.patch(APIurls.applications + `/${id}`, data),
  withdrawApplication: async (id) => await apiService.put(APIurls.applications + `/${id}/withdraw`),
  
  // application

  // application history
  getMyApplicationsHistory : async (params) => await apiService.get(APIurls.applicationHistory + "/auth" , { params }),
  // application history
  
  // job tasks
  jobSampleReceiveStatus: async(id)=>await apiService.patch(APIurls.jobTasks + `/${id}` + '/samples/received'),
  jobSampleRequestStatus: async(id)=>await apiService.patch(APIurls.jobTasks + `/${id}` + '/samples/requested'),
  updateJobTaskWithId: async (id,data) => await apiService.patch(APIurls.jobTasks + `/${id}`, data),
  confirmPaymentWithJobTaskId: async (id) => await apiService.patch(APIurls.jobTasks + `/${id}`+ '/payment-confirmation/creator'),
  getMyJobs: async (params) => await apiService.get(APIurls.jobTasks, { params }),
  getMyJobsCount: async (params) => await apiService.get(APIurls.jobTasks + "/count", { params }),
  renewJob: async (id,data) => await apiService.post(APIurls.jobTasks + "/renew" + `/${id}`,data),
  reapplyJob: async (id, data) => await apiService.post(APIurls.jobTasks + "/reapply" + `/${id}`,data),
  uploadContent: async (id, data) => await apiService.patch(APIurls.jobTasks + `/${id}` + "/upload-content", data),
  // job tasks



  // chat
  deleteRoom: async (id) => await apiService.delete(APIurls.chat + `/rooms/${id}`),
  getUserRooms: async () => await apiService.get(APIurls.chat + `/rooms/user`),
  getSystemRoom: async () => await apiService.get(APIurls.chat + `/system/room`),
  getNotifications : async (params) => await apiService.get(APIurls.notifications,{params}),
  markAllRead : async () => await apiService.patch(APIurls.notifications + `/markAllRead`),
  getTodayNotifications : async (params) => await apiService.get(APIurls.notifications + `/today-notifications`, {params}),
  getOldNotifications : async (params) => await apiService.get(APIurls.notifications + `/older-notifications`, {params}),
  markAsRead : async (id) => await apiService.patch(APIurls.notifications + `/${id}` + `/read`),
  deleteNotification : async (id) => await apiService.delete(APIurls.notifications + `/${id}`),
  getReadNotificationStatus : async () => await apiService.get(APIurls.notifications + `/read-status`),
  // chat

  // chat --- Message
  saveMessage: async (data) => await apiService.post(APIurls.chat + `/messages` , data),
  getRoomMessages: async (roomId, params) => await apiService.get(APIurls.chat + `/messages/${roomId}`, {params}),
  readUnreadMessages: async (data) => await apiService.post(APIurls.chat + `/messages/readAll`, data),
  unreadLastMessage: async (roomId) => await apiService.patch(APIurls.chat + `/unread/`+roomId),
  markAllAsRead: async (data) => await apiService.post(APIurls.chat + `/markAllAsRead`, data),
  getUsersWithRoom: async () => await apiService.get(APIurls.chat + `/getusers`),
  deleteMessage: async (id) => await apiService.delete(APIurls.chat + `/message/${id}`),
  sendFile: async (data) => await multipart.post(APIurls.chat + "/upload", data),
};
