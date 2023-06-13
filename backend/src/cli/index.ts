import { saltRounds } from '@/controllers/Base.js'

import * as Bcrypt from 'bcrypt'
import * as process from 'process'

if (process.argv.length < 3) {
  console.log('Usage: npm run cli <command>')
  process.exit(1)
}

const command = process.argv[2]
const args = process.argv.slice(3)

switch (command) {
  case 'hash':
    if (args.length < 1) {
      console.log('Usage: npm run cli hash <password>')
      process.exit(1)
    }

    const password = args[0]
    console.log(await Bcrypt.hash(password, saltRounds))
}
