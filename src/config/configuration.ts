type EnvironmentType = 'test' | 'production';
type TokenType = '' | 'Bearer' | 'Basic';

type ConfigurationValidator = {
  ENVIRONMENT: EnvironmentType;
  AUTHORIZATION_KEY: string;
  TYPE_TOKEN?: TokenType;
  API_TIMEOUT_REQUEST?: number;
};

export const configuration: ConfigurationValidator = {
  ENVIRONMENT: process.env.NODE_ENV as EnvironmentType,
  AUTHORIZATION_KEY: 'Authorization',
  TYPE_TOKEN: 'Bearer',
  API_TIMEOUT_REQUEST: 20000
};

export const apiServices = {
  API_AUTH: process.env.REACT_APP_API_AUTH,
  API_PAYMENT: process.env.REACT_APP_API_PAYMENT,
  API_MERCHANT: process.env.REACT_APP_API_MERCHANT,
  API_IDP: process.env.REACT_APP_API_IDP
};

export const urlApiServices = {
  API_IAM: '/api/iam',
  API_PAYMENT: '/api/payments',
  API_MERCHANT: '/api/merchants',
  API_IDP: '/api/idp'
};
