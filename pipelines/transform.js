import fs from 'fs'
import { Transform, Readable } from 'stream'
import { pipeline } from 'stream/promises'
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

class TicketStream extends Readable {
  constructor(options) {
    super(options)
    this.generator = createTicketGenerator()
  }

  _read() {
    const { value, done } = this.generator.next()
    if (done) {
      this.push(null)
    } else {
      this.push(JSON.stringify(value))
    }
  }
}

async function streamJsonToCsvFile(destinationPath) {
  const ticketGenerator = createTicketGenerator()
  const readStream = new TicketStream(ticketGenerator)
  const jsonToCsvTransform = new Transform({
    transform(chunk, encoding, callback) {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const writeStream = fs.createWriteStream(destinationPath, 'utf8')
  try {
    await pipeline(readStream, jsonToCsvTransform, writeStream)
    console.log('File copied successfully.')
  } catch (error) {
    console.error('Error copying file:', error)
  }
}

// Usage example
streamJsonToCsvFile('destination.csv')
