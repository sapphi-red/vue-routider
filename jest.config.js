module.exports = {
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1'
  },
  coverageDirectory: './coverage/',
  collectCoverage: true
}
