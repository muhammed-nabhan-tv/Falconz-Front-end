module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.cjs"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  testMatch: ["<rootDir>/src/*/.test.jsx"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};