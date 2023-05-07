import fs from 'fs'
import { pipeline } from 'stream/promises'

// causes backpressure
function copyFile(sourcePath, destinationPath) {
    const readStream = fs.createReadStream(sourcePath, 'utf8')
    const writeStream = fs.createWriteStream(destinationPath, 'utf8')
  
    readStream.on('error', (error) => {
      console.error('Error reading file:', error)
    })
  
    writeStream.on('error', (error) => {
      console.error('Error writing to file:', error)
    })
  
    readStream.on('data', (chunk) => {
        writeStream.write(chunk)
    })
  
    readStream.on('end', () => {
      console.log('File copied successfully.')
    })
  }

function copyFileWithPipes(sourcePath, destinationPath) {
  const readStream = fs.createReadStream(sourcePath, 'utf8')
  const writeStream = fs.createWriteStream(destinationPath, 'utf8')

  readStream.on('error', (error) => {
    console.error('Error reading file:', error)
  })

  writeStream.on('error', (error) => {
    console.error('Error writing to file:', error)
  })

  readStream.pipe(writeStream).on('error', (error) => {
    console.error('Error copying file:', error)
    })

  readStream.on('end', () => {
    console.log('File copied successfully.')
  })
}

async function copyFileTheModernWay(sourcePath, destinationPath) {
  const readStream = fs.createReadStream(sourcePath, 'utf8')
  const writeStream = fs.createWriteStream(destinationPath, 'utf8')
  try {
    await pipeline(readStream, writeStream)
    console.log('File copied successfully.')
  } catch (error) {
    console.error('Error copying file:', error)
  }
}

// Usage example
copyFileTheModernWay('source.txt', 'destination.txt')
