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
  modulePathIgnorePatterns: [
    '<rootDir>/lib',
    '<rootDir>/examples',
    '<rootDir>/coverage',
    '<rootDir>/core',
    '<rootDir>/i18n',
    '<rootDir>/state',
    '<rootDir>/satcheljs',
    '<rootDir>/utils'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true
};
