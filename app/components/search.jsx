import { Input } from '@/components/ui/input';

export function Search({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
