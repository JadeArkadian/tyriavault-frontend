/******************************* */
/** Response objects interfaces  */
/******************************* */

/**
 * Interface describing the response of the backend service /api/v1/common/tokeninfo 
 */
export interface TokenInfoResponse {
  api_key: string;
  permissions: string[];
  last_time_checked: Date;
  game_account_uuid: string;
}

/**
 * Interface describing the response of the backend service /api/v1/account 
 */
export interface AccountInfoResponse {
  uuid: string;
  account_name: string;
  creation_date: Date;
  fractal_level: number;
  world_name: LocalizedText;
  content_access: string[];
  last_modified: Date;
}

/************************** */
/** Inner objects interfaces*/
/************************** */

/**
 * Interface representing a localized text comming from the API 
 */
export interface LocalizedText {
  es: string;
  en: string;
  fr: string;
  de: string;
}


