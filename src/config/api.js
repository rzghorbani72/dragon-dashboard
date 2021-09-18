const baseUrl = 'localhost:8080';
const v1 = '/v1';
const api = {
  auth: {
    login: () => `${baseUrl}${v1}/auth/login`,
    checkUser: () => `${baseUrl}${v1}/auth/checkUser`,
    verify: () => `${baseUrl}${v1}/auth/verify`,
    logout: () => `${baseUrl}${v1}/auth/logout`
  },
  otp: {
    verify: () => `${baseUrl}${v1}/otp/verify`,
    sendSms: () => `${baseUrl}${v1}/otp/sendSms`
  },
  user: {
    list: () => `${baseUrl}${v1}/user/list`,
    filter: () => `${baseUrl}${v1}/user/search`,
    update: () => `${baseUrl}${v1}/auth/update`
  },
  order: {
    submit: () => `${baseUrl}${v1}/order/create`
  },
  category: {
    create: () => `${baseUrl}${v1}/category/create`,
    list: () => `${baseUrl}${v1}/category/list`,
    getOne: (id) => `${baseUrl}${v1}/category/single/${id}`,
    update: (id) => `${baseUrl}${v1}/category/update/${id}`,
    delete: (id) => `${baseUrl}${v1}/category/delete/${id}`
  },
  course: {
    create: () => `${baseUrl}${v1}/course/create`,
    list: () => `${baseUrl}${v1}/course/list`,
    getOne: (id) => `${baseUrl}${v1}/course/single/${id}`,
    update: (id) => `${baseUrl}${v1}/course/update/${id}`,
    delete: (id) => `${baseUrl}${v1}/course/delete/${id}`
  },
  video: {
    upload: () => `${baseUrl}${v1}/file/upload/video`,
    list: () => `${baseUrl}${v1}/file/list?type=video`,
    update: (uid) => `${baseUrl}${v1}/file/update/${uid}`,
    regularDownload: (uid) => `${baseUrl}${v1}/file/downloadVideo/${uid}`,
    privateDownload: (uid) => `${baseUrl}${v1}/file/downloadPrivateVideo/${uid}`
  },
  image: {
    upload: () => `${baseUrl}${v1}/file/upload/image`,
    list: () => `${baseUrl}${v1}/file/list?type=image`,
    update: (uid) => `${baseUrl}${v1}/file/update/${uid}`,
    getOne: (uid) => `${baseUrl}${v1}/file/image/${uid}`
  },
  discount: {
    checkCode: (code) => `${baseUrl}${v1}/discount/check/${code}`,
    voucherCodeGenerator: () => `${baseUrl}${v1}/discount/voucherGenerator`,
    create: () => `${baseUrl}${v1}/discount/create`,
    update: (id) => `${baseUrl}${v1}/discount/update/${id}`,
    getOne: (code) => `${baseUrl}${v1}/discount/single/${code}`,
    list: (isExpired) => `${baseUrl}${v1}/discount/list?isExpired=${isExpired}`,
    delete: (id) => `${baseUrl}${v1}/discount/delete/${id}`
  }
};
export default api;
