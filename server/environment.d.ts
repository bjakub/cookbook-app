declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local' | 'demo' | 'production';
      DB_URI: string;
      SALT_WORK_FACTOR: string;
      JWT_SECRET: string;
    }
  }
}

export {};
