import { Readable } from "stream"
import {
  ticketDescription,
  ticketPriority,
  ticketAssignee,
} from "../iterators/ticket-commons.js"

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

const createTicketGeneratorOutOfStream = async function* () {
  const ticketStream = new TicketStream()
  for await (const chunk of ticketStream) {
    yield JSON.parse(chunk)
  }
}

const ticketGenerator = createTicketGeneratorOutOfStream()
for (const ticket of ticketGenerator) {
  console.log(ticket)
}
