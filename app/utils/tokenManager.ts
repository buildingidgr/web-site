interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

let tokenData: Tokens | null = null;
let tokenExpiryTime: number | null = null;

export const tokenManager = {
  setTokens(tokens: Tokens) {
    tokenData = tokens;
    tokenExpiryTime = Date.now() + (tokens.expires_in * 1000);
  },

  getAccessToken(): string | null {
    if (!tokenData || !tokenExpiryTime) return null;
    if (Date.now() >= tokenExpiryTime) return null;
    return tokenData.access_token;
  },

  getRefreshToken(): string | null {
    return tokenData?.refresh_token || null;
  },

  clear() {
    tokenData = null;
    tokenExpiryTime = null;
  }
}; 