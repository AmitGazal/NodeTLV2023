function ticketDescription() {
    const adjectives = ['critical', 'urgent', 'minor', 'serious', 'complex', 'simple'];
    const nouns = ['login', 'payment', 'search', 'profile', 'dashboard', 'report'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const description = `The ${adjective} ${noun} feature is not working properly.`;
    return description;
}

function ticketPriority() {
    const priorities = ['low', 'medium', 'high', 'critical']
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    return priority;
}

function ticketAssignee() {
    const assignees = [
        'Node McNodeface',
        'Captain Codebeard',
        'Async Avenger',
        'Promise Paladin',
        'The Nodeinator',
        'The Callback Kid',
        'Dr. Code Love',
        'Commander Console',
        'The Nodester',
        'Codezilla',
    ]
    const assignee = assignees[Math.floor(Math.random() * assignees.length)];
    return assignee;
}

const createTicketGenerator = function*() {
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
while (true) {
    const ticket = ticketGenerator.next().value
    console.log(ticket)
}