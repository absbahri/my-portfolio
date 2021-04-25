
// Import database function from database folder
import db from '../../utils/db';

// Async Request with response
export default async (req, res) => {
  try {
    // Get Entries object in databse in date created order
    const entries = await db.collection('entries').orderBy('created').get();
    // Map Entries into array and stave to entries data
    const entriesData = entries.docs.map(entry => ({
      // Store ID
      id: entry.id,
      // Get Entry data, e.g. title content etc
      ...entry.data()
    }));
    res.status(200).json({ entriesData });
  } catch (e) {
    res.status(400).end();
  }
}