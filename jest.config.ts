import type { Config } from 'jest';

const config: Config = {
      preset: 'ts-jest',
  testEnvironment: 'jsdom',
 setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
 transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
};

export default config;
