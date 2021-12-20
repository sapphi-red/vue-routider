module.exports = {
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.ts$': 'es-jest'
  },
  testEnvironment: 'jsdom',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/src/test-util.ts']
}
