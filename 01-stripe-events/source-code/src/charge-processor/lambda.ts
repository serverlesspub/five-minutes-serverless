// Allow CloudWatch to read source maps
import 'source-map-support/register'

// Import event types from @types/aws-lambda
import { ScheduledEvent } from 'aws-lambda'

// Export handler function
export async function handler(event: ScheduledEvent): Promise<number> {
  // Log the event
  console.log(event)
  return true
}