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

const createTicketGeneratorOutOfStream = async function* () {
  const ticketStream = Readable.from(createTicketGenerator())
  for await (const chunk of ticketStream) {
    yield JSON.parse(chunk)
  }
}

const ticketGenerator = createTicketGeneratorOutOfStream()
for (const ticket of ticketGenerator) {
  console.log(ticket)
}
