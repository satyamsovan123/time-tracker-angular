import { COMMON_CONSTANTS } from '../constants/common.constant';

export class BackendResponse {
  data?: any;
  message: string;
  status: boolean;

  constructor(response: BackendResponse) {
    this.data = response.data || null;
    this.message = response.message || COMMON_CONSTANTS.GENERIC_ERROR_MESSAGE;
    if (response.status) this.status = response.status;
    else this.status = false;
  }
}
