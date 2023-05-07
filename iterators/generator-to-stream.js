import { Readable } from "stream"
import { ticketDescription, ticketPriority, ticketAssignee } from "./ticket-commons.js"

const createTicketGenerator = function* () {
  let ticketNumber = 0
  while (true) {
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

const ticketStream = new TicketStream()
ticketStream.pipe(process.stdout)
