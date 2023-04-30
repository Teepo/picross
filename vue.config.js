import { defineConfig } from '@vue/cli-service';

const publicPath = process.env.NODE_ENV === 'gh:prod' ? '/picross/' : '';

export default defineConfig({

  publicPath : publicPath,

  transpileDependencies: true,

  pluginOptions: {
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: 'src/svg/',
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: 'svg/sprite.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  }
});