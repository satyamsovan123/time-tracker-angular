export const API_CONSTANTS = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  PROFILE: '/profile',
  TASK: '/task',
  INSIGHT: '/insight',
};

export const REQUEST_RESPONSE_BODY_HEADER_CONSTANTS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  AUTHORIZATION_TOKEN: 'X-Time-Tracker-Authorization-Token',
  TASK_LIST: 'taskList',
  DATE_ADDED: 'dateAdded',
  START_TIME: 'startTime',
  END_TIME: 'endTime',
  TIME_USED: 'timeUsed',
};

export const BACKEND_ACTION_CONSTANTS = {
  SIGNUP_SUCCESSFUL: 'Signup is successful!',
  SIGNUP_UNSUCCESSFUL: 'Unable to signup, please try again after sometime.',

  SIGNIN_SUCCESSFUL: 'Signin is successful!',
  SIGNIN_UNSUCCESSFUL: 'Unable to signin, please try again after sometime.',
};
