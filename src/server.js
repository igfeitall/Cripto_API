import app from './app'
import Database from './database/config'

require('dotenv').config()
Database.config()

app.listen(3333)