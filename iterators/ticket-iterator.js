import { createTicket } from '../ticket-commons.js'

function createTicketIterator() {
  let ticketNumber = 0
  return {
    next: () => ({
      value: createTicket(++ticketNumber),
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
