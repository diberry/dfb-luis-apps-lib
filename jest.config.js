module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  moduleDirectories: ["node_modules", "lib"],
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverageFrom: ["src/**/*.ts", "test/**/*.ts"],
  coverageDirectory: "./coverage",
  coverageReporters: ["json", "html", "text"],
  testEnvironment: "node",
  notify: true,
  verbose: true,
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  preset: 'ts-jest',
};
