const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withAdiRegistration(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const androidAssetsDir = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "assets"
      );

      const sourceFile = path.join(
        projectRoot,
        "assets",
        "adi-registration.properties"
      );

      const targetFile = path.join(
        androidAssetsDir,
        "adi-registration.properties"
      );

      if (!fs.existsSync(sourceFile)) {
        throw new Error(
          "Missing assets/adi-registration.properties"
        );
      }

      fs.mkdirSync(androidAssetsDir, { recursive: true });
      fs.copyFileSync(sourceFile, targetFile);

      return config;
    },
  ]);
};