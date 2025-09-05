export const basePath = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api/v1'
export const assetsBasePath = process.env.REACT_APP_ASSET_BASE_URL || (basePath.split('/api')[0] + '/uploads/')
// export const assetsBasePath = 'https://pub-fa961811248b42dfb280445c23415b13.r2.dev/'

export const APIurls = {
    auth: '/auth',    
    creator: '/creators',
    campaign : '/campaign',
    invitations: '/invitation',    
    brand: '/brands',
    payment: '/payments',
    jobs: '/jobs',    
    applications: '/applications',    
    jobTasks: '/job-task',            
    contracts: '/pandadoc',
    chat: '/chat',
    reports : '/reports',
    applicationHistory : '/application-history',
    notifications : '/notifications',
}
