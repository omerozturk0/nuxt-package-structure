import path from 'path';

// eslint-disable-next-line
export default function emakina (moduleOptions) {
  const { emakina } = this.options
  const options = {
    ...emakina,
    ...moduleOptions,
  }
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options,
  })
}
