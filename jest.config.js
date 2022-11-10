module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['vue', 'js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@playground/(.*)$': '<rootDir>/playground/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/playground/', '/tests/'],
  coverageReporters: ['text', 'json-summary'],
  // Fix in order for vue-test-utils to work with Jest 28
  // https://github.com/vuejs/vue-jest/issues/479
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
}
