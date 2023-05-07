import fs, { write } from 'fs'
import { pipeline } from 'stream/promises'

async function copyFileTheModernWay(sourcePath, destinations) {
  const readStream = fs.createReadStream(sourcePath, 'utf8')
  const writeStreams = destinations.map((path) =>
    fs.createWriteStream(path, 'utf8')
  )
  try {
    await Promise.all(writeStreams.map((ws) => pipeline(readStream, ws)))
    console.log('File copied successfully.')
  } catch (error) {
    console.error('Error copying file:', error)
  }
}

// Usage example
copyFileTheModernWay('source.txt', [
  'multiple-destinations/destination1.txt',
  'multiple-destinations/destination2.txt',
  'multiple-destinations/destination3.txt',
  'multiple-destinations/destination4.txt',
  'multiple-destinations/destination5.txt'
])
