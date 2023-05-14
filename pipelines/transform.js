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
    yield JSON.stringify(
      {
        ticketNumber: ++ticketNumber,
        date: new Date(),
        description: ticketDescription(),
        priority: ticketPriority(),
        assignee: ticketAssignee(),
      },
      null,
      2
    )
  }
}

async function streamJsonToCsvFile(destinationPath) {
  const ticketGenerator = createTicketGenerator()
  const ticketStream = Readable.from(ticketGenerator)
  const jsonToCsvTransform = new Transform({
    transform(chunk, _encoding, callback) {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const writeStream = fs.createWriteStream(destinationPath, 'utf8')
  try {
    await pipeline(ticketStream, jsonToCsvTransform, writeStream)
    console.log('File copied successfully.')
  } catch (error) {
    console.error('Error copying file:', error)
  }

  // ticketStream.pipe(jsonToCsvTransform).pipe(writeStream)
  // ticketStream.on('error', (error) => {
  //   console.error('Error reading file:', error)
  // })
  // jsonToCsvTransform.on('error', (error) => {
  //   console.error('Error transforming file:', error)
  // })
  // writeStream.on('error', (error) => {
  //   console.error('Error writing file:', error)
  // })
}

// Usage example
streamJsonToCsvFile('destination.csv')
