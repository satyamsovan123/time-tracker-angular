export const COMMON_CONSTANTS = {
  UNAUTHORIZED:
    'Sorry, we are unable to give you access to this page. Please sign in to continue.',
  GENERIC_ERROR_MESSAGE:
    'Sorry, some error occured on our side. Please try again after some time.',
  INVALID_CREDENTIALS:
    'The email and password did not match our records. Please try again with correct credentials.',
  UNABLE_TO_GET_DATA:
    'Sorry, we are unable to communicate with our server. Please try again after some time.',
  UNABLE_TO_UPDATE_DATA:
    'Sorry, we are unable to communicate with our server. Please try again after some time.',

  DELETE_DATA_CONFIRMATION:
    'This data would be deleted, are you sure you want to delete this data?',
  DELETE_ACCOUNT_CONFIRMATION:
    'Your account and all the related data would be deleted immediately, and this action is not reversible. Are you sure you want to delete your account and all the related data?',

  LOG_ERROR: 'error',
  LOG_SUCCESS: 'success',

  LIGHT_THEME: 'light',
  DARK_THEME: 'dark',
  PAGE_DOESNT_EXIST: "It seems like you have found a page that doesn't exist!",
};

export const FORM_CONSTANTS = {
  INVALID_FORM_STATUS: 'INVALID',
  VALID_FORM_STATUS: 'VALID',
  INVALID_FORM:
    'There are some invalid entries, please correct them and resubmit.',
  TASK_FORM_VALDITY:
    'The start time and end time and time used cannot be empty. Start time should be less than the end time, time used should be less than the logged time.',
  INVALID_EMAIL: 'Invalid email, please provide a valid email address.',
  INVALID_PASSWORD:
    'Invalid password, please provide a valid email password of 6 digits.',
  INVALID_FIRSTNAME:
    'Invalid first name, please provide a valid first name with letters and numbers.',
  INVALID_LASTNAME:
    'Invalid last name, please provide a valid last name with letters and numbers.',

  INVALID_START_TIME: 'Invalid start time, please provide a valid time',
  INVALID_END_TIME: 'Invalid end time, please provide a valid time',
  INVALID_TIME_USED: 'Invalid starting time, please provide a valid time',
  FOR_ROW: 'for row',
  START_TIME_TIP: 'Please enter the time you want to log.',
  TIME_USED_TIP: 'Please enter total time you have used between ',
  END_TIME_TIP:
    'Please enter the time you want to log, which should be more than ',
  DELETE_TASK_TIP: 'Delete logged time data from ',
};
