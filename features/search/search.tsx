'use client';
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  //   const [results, setResults] = useState<any[]>([]);
  //   const [loading, setLoading] = useState(false);

  //   async function handleSearch() {
  //     if (!query) return;
  //     setLoading(true);

  //     const response = await hybridSearch(query);
  //     setResults(response.data || []);
  //     setLoading(false);
  //   }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-xl font-bold">🔍 Hybrid Search</h1>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type a search term..."
        className="mt-4 w-full border p-2"
      />

      <button
        // onClick={handleSearch}
        className="mt-2 w-full bg-blue-500 px-4 py-2 text-white"
        // disabled={loading}
      >
        {/* {loading ? 'Searching...' : 'Search'} */}
      </button>

      {/* {results.length > 0 && (
        <ul className="mt-4">
          {results.map((item, index) => (
            <div key={item.element_id}>
              {item.title}

              <Image height={200} width={200} src={item.thumbnail_url} alt={item.title} />
            </div>
          ))}
        </ul>
      )} */}
    </div>
  );
}
