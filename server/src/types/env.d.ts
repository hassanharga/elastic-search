declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      API_URL: string;
      ELASTIC_URL: string;
      ELASTIC_USERNAME: string;
      ELASTIC_PASSWORD: string;
    }
  }
}

export {}
