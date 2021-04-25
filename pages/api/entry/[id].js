
// Import database function from database folder
import db from '../../../utils/db';

export default async (req, res) => {

  // Gets randomly generated ID from request object query value
  const { id } = req.query;

  try {
    // if method is put (UPDATE)
    if (req.method === 'PUT') {
      // Update entries collectio object with same Id with body daya and new timestamp
      await db.collection('entries').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
      // If is load method
    } else if (req.method === 'GET') {
      // Load using quest ID
      const doc = await db.collection('entries').doc(id).get();
      if (!doc.exists) {
        // If does not exist end and return 400 status
        res.status(404).end();
      } else {
        // Else return JSON and return 200 status
        res.status(200).json(doc.data());
      }
      // IF delete
    } else if (req.method === 'DELETE') {

      // Delete entry in entries object with same id
      await db.collection('entries').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}