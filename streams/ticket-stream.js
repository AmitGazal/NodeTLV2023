import {Readable} from 'stream'
import {createTicket} from '../ticket-commons.js'

class TicketStream extends Readable {
    constructor(options) {
        super(options)
        this.ticketNumber = 0
    }

    _read() {
        const ticket = createTicket(++this.ticketNumber)
        this.push(JSON.stringify(ticket, null, 2))
    }
}

const ticketStream = new TicketStream()
ticketStream.setEncoding('utf8')
ticketStream.on('data', (chunk) => {
    console.log(chunk)
})
ticketStream.on('error', (error) => {
    console.error(error)
})
ticketStream.on('end', () => {
    console.log('Do it here!')
})