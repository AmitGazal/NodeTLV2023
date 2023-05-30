import { Readable } from 'stream'
import {
  ticketDescription,
  ticketPriority,
  ticketAssignee,
} from '../ticket-commons.js'

const createTicketGenerator = function* () {
  let ticketNumber = 0
  while (true) {
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
      this.push(JSON.stringify(value, null, 2))
    }
  }
}

// const ticketStream = new TicketStream()

const ticketStream = Readable.from(createTicketGenerator())
// ticketStream.setEncoding("utf8")
// while(true) {
//   console.log(ticketStream.read())
// }
// for await (const ticket of ticketStream) {
//   console.log(ticket)
// }

// ticketStream.pipe(process.stdout)

ticketStream.on('data', (chunk) => {
  console.log(chunk)
})

// ticketStream.on('error', (error) => {
// ticketStream.on('finish', () => {

// ticketStream.on('close'
// ticketStream.on('data'
// ticketStream.on('end'
// ticketStream.on('error'
// ticketStream.on('pause'
// ticketStream.on('readable'
// ticketStream.on('resume'

