export const API_CONSTANTS = {
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
  SIGNUP_SUCCESSFUL: 'You are now ready to take control of your time!',
  SIGNUP_UNSUCCESSFUL:
    'Sorry, we are unable to sign you up. Please try again after some time.',
  SIGNIN_SUCCESSFUL: 'Sign in was successful.',
  SIGNIN_UNSUCCESSFUL:
    'Sorry, we are unable to take you to your dashboard. Please try again after some time.',

  SIGNOUT_SUCCESSFUL: 'Sign out was successful.',
  SIGNOUT_UNSUCCESSFUL:
    'Sorry, we are unable to sign you out. Please try again after some time.',

  TIMESHEET_UPDATION_SUCCESSFUL: 'The time sheet is updated.',
  TIMESHEET_UPDATION_UNSUCCESSFUL:
    'Sorry, we are unable to update your timesheet. Please try again after some time.',

  UNABLE_TO_FETCH_TIMESHEET:
    'Sorry, we are unable to get your timesheet. Please try again after some time.',

  UNABLE_TO_FETCH_INSIGHTS:
    'Sorry, we are unable to generate insights for you. Please try again after some time.',

  ACCOUNT_DELETION_SUCCESSFUL:
    'Your account is deleted. And, we are sad to see you go.',
  ACCOUNT_DELETION_UNSUCCESSFUL:
    'Sorry, we are unable to delete your account. Please try again after some time.',

  UNABLE_TO_FETCH_PROFILE:
    'Sorry, we are unable to get your account details. Please try again after some time.',
  INSIGHT_DELETION_SUCCESSFUL: 'Insight for the date is deleted successfully.',
  INSIGHT_DELETION_UNSUCCESSFUL:
    'Sorry, we are unable to delete that insight. Please try again after some time.',
};
