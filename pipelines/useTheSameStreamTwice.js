import fs, { write } from 'fs'
import { Transform, Readable, Writable } from 'stream'
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
  const jsonToCsvGenerator = async function* (iterator) {
    for await (const chunk of iterator) {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      yield csv
    }
  }
  const writeStream = fs.createWriteStream(destinationPath, 'utf8')
  const writeStream2 = fs.createWriteStream(`${destinationPath}-2`, 'utf8')

  try {
    await Promise.all([
      pipeline(ticketGenerator, jsonToCsvGenerator, writeStream),
      pipeline(ticketGenerator, jsonToCsvGenerator, writeStream),
    ])
    console.log('File copied successfully.')
  } catch (error) {
    console.error('Error copying file:', error)
  }
}

async function useReadableTwice() {
  const ticketGenerator = createTicketGenerator()
  const ticketGenerator2 = createTicketGenerator()
  const ReadableStream = Readable.from(ticketGenerator)
  const transformStream = new Transform({
    transform: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const transformStream2 = new Transform({
    transform: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  await Promise.all([
    pipeline(ReadableStream, transformStream, process.stdout),
    pipeline(ReadableStream, transformStream2, process.stdout),
  ])
}

async function useTransformTwice() {
  const ticketGenerator = createTicketGenerator()
  const ticketGenerator2 = createTicketGenerator()
  const ReadableStream = Readable.from(ticketGenerator)
  const transformStream = new Transform({
    transform: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const ReadableStream2 = Readable.from(ticketGenerator2)
  await Promise.all([
    pipeline(ReadableStream, transformStream, process.stdout),
    pipeline(ReadableStream2, transformStream, process.stdout),
  ])
}

async function useWriteTwice() {
  const ticketGenerator = createTicketGenerator()
  const ticketGenerator2 = createTicketGenerator()
  const ReadableStream = fs.ReadStream('source.json', 'utf8')
  const transformStream = new Transform({
    transform: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const transformStream2 = new Transform({
    transform: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk)
      const csv = `${Object.values(json).join(',')}\n`
      callback(null, csv)
    },
  })
  const ReadableStream2 = Readable.from(ticketGenerator2)
  const writeStream = fs.createWriteStream('tickets.csv', 'utf8')
  await Promise.all([
    pipeline(ReadableStream, transformStream, writeStream),
    pipeline(ReadableStream, transformStream, writeStream),
  ])
}

function timeout(timeInMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeInMs)
  })
}

async function useAsyncIteratorsTwice() {
  const generator = async function* () {
    yield 'a'
    yield 'b'
    yield 'c'
  }
  const transformGenerator = async function* (iterator) {
    for await (const chunk of iterator) {
      yield chunk.repeat(2)
    }
  }
  for await (const chunk of transformGenerator(
    transformGenerator(generator())
  )) {
    process.stdout.write(chunk)
  }

  await pipeline([
    generator(),
    transformGenerator,
    transformGenerator,
    process.stdout,
  ])
}

// Usage example
useAsyncIteratorsTwice()
