import copy from 'rollup-plugin-copy';
import { screepsConfig } from './screeps.config.js';

export default {
  build: {
    minify: false,
    sourcemap: false,
    lib: {
      entry: 'src/main.js',
      name: 'main',
      fileName: 'main',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        format: 'cjs', // 输出格式为 CommonJS
        entryFileNames: '[name].js', // 入口文件的命名
        chunkFileNames: 'js/[name].js', // 代码块的命名
      },
      plugins: [
        copy({
          targets: [
            // 该项目为js项目，仍可使用.d.ts
            {
              src: 'typings/*',
              dest: 'node_modules/@types/screeps-user',
            },
            {
              src: 'dist/*',
              dest: screepsConfig.targetDir,
            },
          ],
          verbose: true,
          hook: 'closeBundle',
        }),
      ],
    },
  },
  include: ['**/*.*'],
  exclude: ['**/tmp/**/*', '**/*.d.ts'],
};
