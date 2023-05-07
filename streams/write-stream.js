import fs from 'fs'
import { Writable } from 'stream'
import {
  ticketDescription,
  ticketPriority,
  ticketAssignee,
} from '../iterators/ticket-commons.js'

const createTicketGenerator = function* () {
  let ticketNumber = 0
  while (true) {
    if (ticketNumber > 10) {
      return
    }
    yield {
      ticketNumber: ++ticketNumber,
      date: new Date(),
      description: ticketDescription(),
      priority: ticketPriority(),
      assignee: ticketAssignee(),
    }
  }
}

class myCreateWriteStream extends Writable {
  constructor(options) {
    super(options)
    this.filePath = options.file
  }

  _write(chunk, encoding, callback) {
    try {
      fs.appendFileSync(this.filePath, chunk)
      callback(null)
    } catch (error) {
      callback(error)
    }
  }
}

const writeStream = new myCreateWriteStream({ file: 'test.txt' })
const ticketGenerator = createTicketGenerator()

for (const ticket of ticketGenerator) {
  writeStream.write(JSON.stringify(ticket))
  writeStream.write('\n')
}
