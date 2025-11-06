'use client';

import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('./SearchBox'), {
  ssr: false,
  loading: () => <div style={{ height: '56px' }} className="w-full max-w-2xl bg-white/5 rounded-lg animate-pulse" />
});

export default SearchBox;
