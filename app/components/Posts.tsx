import { Link } from "react-router";
import type { entryItem } from "~/domain/entities";

// First Entry component for displaying the featured entry
function FeaturedEntry({ entry }: { entry: entryItem }) {
  return (
    <div className="mb-6 rounded flex flex-col md:flex-row items-center border-b md:border-b-0 border-neutral-700">
      {entry.image && (
        <div className="md:w-1/2 md:h-96 h-64">
          <Link to={`${entry.id}`}>
            <img
              src={`/images/${entry.image}`}
              alt={entry.title}
              className="w-full h-full object-cover rounded-t md:rounded-l md:rounded-t-none"
            />
          </Link>
        </div>
      )}
      <div className="md:py-10 md:px-10 py-4 md:w-1/2 flex flex-col justify-between space-y-4">
        <div>
          <div className="md:text-3xl text-xl font-semibold mb-6">
            {entry.title}
          </div>
          <div className="text-secondary  md:text-lg">{entry.subtitle}</div>
        </div>
        <div className="pt-2">
          <Link to={`${entry.id}`} className="text-primary hover:underline">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PostsList({ entriesList }: { entriesList: Array<entryItem> }) {
  // If there are no entries, return nothing
  if (entriesList.length === 0) {
    return null;
  }

  // Extract the first entry and the rest
  const [firstEntry, ...restEntries] = entriesList;

  return (
    <>
      {/* Featured first entry */}
      <FeaturedEntry entry={firstEntry} />

      {/* Remaining entries in grid layout */}
      {restEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restEntries.map((item) => (
            <div key={item.id} className="mb-2 rounded flex-col flex">
              <div className="flex flex-col">
                <div>
                  {item.image && (
                    <Link to={`${item.id}`}>
                      <img
                        src={`/images/${item.image}`}
                        alt={item.title}
                        className="w-full rounded-t h-full object-cover"
                      />
                    </Link>
                  )}
                </div>
              </div>
              <div className="py-4 px-4 flex flex-col space-y-2 border-b md:border-l md:border-r border-neutral-700">
                <div className="text-xl font-semibold">{item.title}</div>
                {item.subtitle && (
                  <div className="text-secondary text-base">
                    {item.subtitle}
                  </div>
                )}

                <div>
                  <Link to={`${item.id}`}>read</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
