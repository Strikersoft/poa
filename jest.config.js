module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.test.json',
      enableTsDiagnostics: false,
      ignoreCoverageForDecorators: true,
      ignoreCoverageForAllDecorators: true
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(tsx?)$',
  modulePathIgnorePatterns: ['<rootDir>/lib', '<rootDir>/examples', '<rootDir>/coverage'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false
};
