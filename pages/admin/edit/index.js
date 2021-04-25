// In the edit page, we listed all the entries by fetching them from the /api/entries endpoint.
// Then, we used the id key to link to that specific entry, which will be matched by admin/edit/[id].js.

import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';

const List = () => {
  const [entries, setEntries] = useState([]);
  useEffect(async () => {
    const res = await axios.get('/api/entries');
    setEntries(res.data.entriesData);
  }, []);

  return (
    <div>
      <h1>Entries</h1>
      {entries.map(entry => (
        <div key={entry.id}>
          <Link href={`/admin/edit/${entry.id}`}>
            <a>{entry.title}</a>
          </Link>
          <br/>
        </div>
      ))}
    </div>
  );
};

export default List;