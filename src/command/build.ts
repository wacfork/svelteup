import { build } from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import { Options } from '../interface/CommandOptions';
import { defaultCompileOptions } from './const';
import coffeeScriptPlugin from '@iuser/esbuild-coffeescript';

export default (opts: Options) => {
  const { entryPoints, outdir, watch, minify } = opts;
  build({
    entryPoints,
    outdir,
    format: 'esm',
    charset: 'utf8',
    bundle: true,
    splitting: false,
    sourcemap: opts.sourcemap ?? watch,

    watch: watch
      ? {
          onRebuild(error, result) {
            if (error) console.error('[Error] Watch build:', error);
            else {
              console.log('[Success] File Rebuilding...');
              opts.onRebuild && opts.onRebuild();
            }
          },
        }
      : false,
    plugins: [
      ...(opts.esbuild?.plugins || []),
      coffeeScriptPlugin({
        bare: true,
        inlineMap: true
      }),
      sveltePlugin({
        preprocess: opts.preprocess,
        compilerOptions: {
          ...defaultCompileOptions,
          ...opts.compilerOptions,
        },
      }),
    ],
    ...(opts.esbuild || {})
  });

  console.log('[Success] All components are bundled');
};
