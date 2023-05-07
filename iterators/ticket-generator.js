import {
  ticketDescription,
  ticketPriority,
  ticketAssignee,
} from "./ticket-commons.js"

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

const ticketGenerator = createTicketGenerator()
// while (true) {
//     const ticket = ticketGenerator.next().value
//     console.log(ticket)
// }

for (const ticket of ticketGenerator) {
  console.log(ticket)
}

// Example with for of
// State is saved in the return value
// Babel ES5
