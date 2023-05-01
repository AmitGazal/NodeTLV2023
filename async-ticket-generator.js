import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

const PROMPT = `
Create a ticket for my web development team.
A ticket should contain: ticketNumber, date, description, priority, and asignee.
Assignee can be one of: Node McNodeface, Captain Codebeard, Async Avenger, Promise Paladin, The Nodeinator, The Callback Kid, Dr. Code Love, Commander Console, The Nodester, and Codezilla.
Be creative with the description.

Here are some examples:
 {
  ticketNumber: 1454,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The complex profile feature is not working properly.',
  priority: 'low',
  assignee: 'The Callback Kid'
}
{
  ticketNumber: 1455,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The minor report feature is not working properly.',
  priority: 'critical',
  assignee: 'Dr. Code Love'
}
{
  ticketNumber: 1456,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The simple dashboard feature is not working properly.',
  priority: 'critical',
  assignee: 'Captain Codebeard'
}
{
  ticketNumber: 1457,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The critical profile feature is not working properly.',
  priority: 'high',
  assignee: 'Captain Codebeard'
}
{
  ticketNumber: 1458,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The simple payment feature is not working properly.',
  priority: 'medium',
  assignee: 'The Nodester'
}
{
  ticketNumber: 1459,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The serious dashboard feature is not working properly.',
  priority: 'critical',
  assignee: 'Node McNodeface'
}
{
  ticketNumber: 1460,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The minor profile feature is not working properly.',
  priority: 'medium',
  assignee: 'Promise Paladin'
}
{
  ticketNumber: 1461,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The urgent payment feature is not working properly.',
  priority: 'critical',
  assignee: 'The Nodester'
}
{
  ticketNumber: 1462,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The complex profile feature is not working properly.',
  priority: 'low',
  assignee: 'Dr. Code Love'
}
{
  ticketNumber: 1463,
  date: 2023-04-29T14:50:49.482Z,
  description: 'The minor dashboard feature is not working properly.',
  priority: 'low',
  assignee: 'Dr. Code Love'
}
`
async function* generateEngineeringTickets() {
  while (true) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": PROMPT}],
        temperature: 0.6,
        max_tokens: 2000,
      });

    const ticket = completion.data.choices[0].message.content;

    yield ticket;
  }
}

const ticketGenerator = generateEngineeringTickets();
for (let i = 0; i < 1; i++) {
  const ticket = await ticketGenerator.next();
  console.log(ticket.value);
}

// for await
