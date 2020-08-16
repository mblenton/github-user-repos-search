import path from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import Dotenv from 'dotenv-webpack';

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    devtool: env.development ? 'inline-source-map' : false,
    performance: {
        hints: false
      },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            components: path.resolve(__dirname, "./src/components/")
        }
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'url-loader',
                },
              },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
});

export default webpackConfig;
