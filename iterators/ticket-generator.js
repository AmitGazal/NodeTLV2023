import {
  createTicket,
} from "../ticket-commons.js"

const createTicketGenerator = function* () {
  let ticketNumber = 0
  while (true) {
    yield createTicket(++ticketNumber)
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
