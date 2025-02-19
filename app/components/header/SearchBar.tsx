import { Form } from '@remix-run/react';

export function SearchBar() {
  let initialQuery = '';
  if (typeof window === 'undefined') {
    // running in a server environment
  } else {
    // running in a browser environment
    initialQuery = new URL(window.location.href).searchParams.get('q') ?? '';
  }

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Form method="get" action="/search" key={initialQuery} onClick={handleClick}>
      <input
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search"
        className="flex flex-grow flex-row bg-transparent focus:ring-white focus:border-white text-sm uppercase tracking-[0.15] text-discogray border-t-[1px] border-b-[1px] border-discograytwo-500 w-full"
      />
    </Form>
  );
}
