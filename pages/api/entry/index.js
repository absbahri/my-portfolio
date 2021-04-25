// import returned function from db/index.js
import db from '../../../utils/db';
// Async meas do whenever, req means request e.g. [id] res means response so whatever is returned from db
export default async (req, res) => {
  try {
    // Slug comes from {req: {..., ..., body: xxxx}
    const { slug } = req.body;
    // Await for returned json (collections) from db function
    const entries = await db.collection('entries').get();

    // Map entries into array
    const entriesData = entries.docs.map(entry => entry.data());
    // If slug already exists return 400 status
    if (entriesData.some(entry => entry.slug === slug)) {
      res.status(400).end();
    } else {

      // else add post to collection "entries" using unique ID from req variable
      const { id } = await db.collection('entries').add({
        // Request object body data
        ...req.body,
        // With new created data in objct
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}