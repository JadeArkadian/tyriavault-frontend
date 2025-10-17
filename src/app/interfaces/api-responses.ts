/**
 * Interface describing the response of the backend service /api/v1/common/tokeninfo 
 */
export interface TokeninfoResponse extends Object {
  id: number;
  api_key: string;
  permissions: string;
  game_account_id: number;
}
