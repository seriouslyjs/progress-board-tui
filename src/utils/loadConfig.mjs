import { readFileSync } from 'fs';
import { parse } from 'yaml'

/**
* Load and parse a YAML configuration file.
* @param {string} filePath - Path to the YAML file.
* @returns {Object} - Parsed configuration object.
*/
export const loadYamlConfig = (filePath) => {
  try {
    const fileContents = readFileSync(filePath, 'utf8');
    return parse(fileContents);
  } catch (e) {
    console.error(`Failed to load configuration from ${filePath}:`, e);
    return null;
  }
};
