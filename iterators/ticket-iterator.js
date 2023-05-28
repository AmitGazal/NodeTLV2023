import {
  ticketDescription,
  ticketPriority,
  ticketAssignee,
} from './ticket-commons.js'

function createTicketIterator() {
  let ticketNumber = 0
  return {
    next: () => ({
      value: {
        ticketNumber: ++ticketNumber,
        date: new Date(),
        description: ticketDescription(),
        priority: ticketPriority(),
        assignee: ticketAssignee(),
      },
      done: false,
    }),
    [Symbol.iterator]: function () {
      return this
    },
  }
}

const ticketIterator = createTicketIterator()
// while (true) {
//     const ticket = ticketIterator.next().value
//     console.log(ticket)
// }

for (const ticket of ticketIterator) {
  console.log(ticket)
}
