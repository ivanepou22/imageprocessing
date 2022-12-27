'use strict'
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express = __importDefault(require('express'))
const routes = __importDefault(require('./routes'))
const app = (0, express.default)()
const port = process.env.SERVER_PORT || 5000
// routing
app.use('/api/v1', routes.default)
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
exports.default = app
