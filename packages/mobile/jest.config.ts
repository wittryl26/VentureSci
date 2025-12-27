import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@testing-library/react-native)/)',
  ],
};

export default config;
