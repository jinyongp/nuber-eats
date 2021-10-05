declare namespace NodeJS {
  interface Process {
    env: {
      NODE_ENV: 'dev' | 'test' | 'prod';
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD?: string;
      DB_DATABASE: string;
      BCRYPT_ROUNDS: number;
      JWT_SECRET_KEY: string;
    };
  }
}
