import httpsProxyAgent from 'https-proxy-agent';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from app.env
dotenv.config({ path: path.resolve(__dirname, '..', 'env', 'app.env') });

const endPoints = require('../resources/endpoints/endpoints'); // Assuming `endPoints` is correctly exported from the endpoints configuration file
const sourceRoot = 'src';

// Retrieve the environment from the ENV environment variable or default to 'TEST'
const env = process.env.ENV ?? 'TEST';

type urlPointDataObj = {
    name: string;
    url: string;
}

/**
 * Retrieves the URL based on the provided name and environment.
 * @param name - The name of the URL to retrieve.
 * @returns The retrieved URL as a string.
 * @throws Error if the URL is not found or the environment is not supported.
 */
export async function getUrl(name: string): Promise<string> {
    const envUpper = env.toUpperCase();
    console.log(`Test started in "${envUpper}" ENV`);

    // Define the URLs based on the environment
    const urls: { [key: string]: urlPointDataObj[] } = {
        TEST: endPoints.endpoints.TEST,
        STAGE: endPoints.endpoints.STAGE,
    };

    // Check if the environment is supported
    if (!(envUpper in urls)) {
        throw new Error(`Unsupported environment: ${env}`);
    }

    // Get the array of URLs for the environment
    const environmentUrls: urlPointDataObj[] = urls[envUpper];

    // Find the URL object with a matching name
    const foundUrl = environmentUrls.find((item: urlPointDataObj) => item.name === name);
    console.log(`ENV: ${envUpper} === URL is ${foundUrl?.url}`);

    // Throw an error if the URL is not found
    if (!foundUrl) {
        throw new Error(`URL not found for name: ${name}`);
    }

    return foundUrl.url;
}
