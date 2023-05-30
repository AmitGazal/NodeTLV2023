// returns a random ticket description
export function ticketDescription() {
    const adjectives = ['critical', 'urgent', 'minor', 'serious', 'complex', 'simple'];
    const nouns = ['login', 'payment', 'search', 'profile', 'dashboard', 'report'];
    const issues = ['is not working properly', 'is not functioning correctly', 'is experiencing unexpected behavior', 'is causing errors', 'is displaying incorrect data'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const issue = issues[Math.floor(Math.random() * issues.length)];

    const description = `The ${adjective} ${noun} ${issue}.`;
    return description;
}

// returns a random ticket priority
export function ticketPriority() {
    const priorities = ['low', 'medium', 'high', 'critical']
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    return priority;
}

// returns a random ticket assignee
export function ticketAssignee() {
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

export function createTicket (ticketId) {
    return {
        ticketNumber: ticketId,
        date: new Date(),
        description: ticketDescription(),
        priority: ticketPriority(),
        assignee: ticketAssignee(),
    }
}