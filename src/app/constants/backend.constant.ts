export const API_CONSTANTS = {
  NUMBER_TO_WORD_API:
    'https://www.dataaccess.com/webservicesserver/numberconversion.wso/NumberToWords/JSON/debug?ubiNum=',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  GET_PROFILE: '/get-profile',
  DELETE_PROFILE: '/delete-profile',
  TASK: '/task',
  GET_INSIGHT: '/get-insight',
  DELETE_INSIGHT: '/delete-insight',
};

export const REQUEST_RESPONSE_BODY_HEADER_CONSTANTS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ACCESS_TOKEN: 'access_token',
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

  SIGNOUT_SUCCESSFUL: 'Sign out is successful!',
  SIGNOUT_UNSUCCESSFUL: 'Unable to sign out, please try again after sometime.',

  TIMESHEET_UPDATION_SUCCESSFUL: 'Time sheet is updated!',
  TIMESHEET_UPDATION_UNSUCCESSFUL:
    'Unable to update time sheet, please try again after sometime.',

  UNABLE_TO_FETCH_TIMESHEET:
    'Unable to get time sheet, please try again after sometime.',

  UNABLE_TO_FETCH_INSIGHTS:
    'Unable to get insights, please try again after sometime.',

  ACCOUNT_DELETION_SUCCESSFUL: 'Account deleted successfully!',
  ACCOUNT_DELETION_UNSUCCESSFUL:
    'Unable to delete account, please try again after sometime.',

  UNABLE_TO_FETCH_PROFILE:
    'Unable to get your account details, please try again after sometime.',

  INSIGHT_DELETION_SUCCESSFUL: 'Insight deleted successfully!',
  INSIGHT_DELETION_UNSUCCESSFUL:
    'Unable to delete insight, please try again after sometime.',
};
