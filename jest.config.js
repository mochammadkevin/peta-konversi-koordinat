module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(ol|other-es-modules-to-transform)/)',
      '/node_modules/(?!ol|color-space)',
      "node_modules/(?!ol)"
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy'
      }
  };
  