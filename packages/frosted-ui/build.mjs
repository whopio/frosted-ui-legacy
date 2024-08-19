import { transformFile } from '@swc/core';
import { globIterate } from 'glob';
import { createRequire } from 'module';
import { basename, dirname, join, relative } from 'path';

const require = createRequire(import.meta.url);

const promises = [];

import { mkdir, writeFile } from 'fs/promises';

/**
 * Ensures that the folder exists and writes data to a file.
 *
 * @param {string | Buffer | URL} file - The path to the file where the data should be written.
 * @param {string | Buffer | Uint8Array} data - The data to write to the file.
 * @param {Object} [options] - Optional parameters for writing the file. Can be an encoding string or an object with options.
 * @returns {Promise<void>} - A promise that resolves when the file is written.
 * @throws {Error} - Throws an error if the file cannot be written.
 */
export async function outputFile(file, data, options = {}) {
  try {
    const dir = dirname(file);

    // Ensure the directory exists
    await mkdir(dir, { recursive: true });

    // Write the file
    await writeFile(file, data, options);
  } catch (error) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

/**
 * @param {String} file
 */
async function transformSingle(file) {
  const output = await transformFile(file, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'es2022',
      loose: false,
      minify: {
        compress: false,
        mangle: false,
      },
      transform: {},
      experimental: {
        plugins: [
          [
            require.resolve('@swc/plugin-transform-imports'),
            {
              '@fortawesome/free-solid-svg-icons': {
                transform: '@fortawesome/free-solid-svg-icons/{{member}}',
                skipDefaultConversion: true,
              },
            },
          ],
        ],
      },
    },
    module: {
      type: 'commonjs',
    },
    minify: false,
    isModule: true,
  });

  const relativeDir = relative('./src', dirname(file));
  const distFileName = basename(file).replace(/\.tsx?$/, '.js');
  const distPath = join('./dist', relativeDir, distFileName);

  await outputFile(distPath, output.code);
}

// eslint-disable-next-line no-undef
const start = performance.now();

for await (const file of globIterate('./src/**/*.{ts,tsx}', {
  ignore: [
    '**/*.stories.tsx',
    '**/*.d.ts',
    '**/*.js',
    'src/components/Table/mock-data.ts',
  ],
})) {
  promises.push(transformSingle(file));
}

await Promise.all(promises);

// eslint-disable-next-line no-undef
console.log(
  `Successfully built ${promises.length} files with swc in ${
    // eslint-disable-next-line no-undef
    (performance.now() - start).toFixed(2)
  }ms`,
);
