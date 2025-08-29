import { Link } from "react-router";

// First Entry component for displaying the featured entry
function FeaturedEntry({
  entry,
}: {
  entry: { title: string; description: string; path: string; image: string };
}) {
  return (
    <div className="mb-6 md:rounded  flex flex-col md:flex-row items-center border-b md:border-b-0 border-neutral-300 dark:border-neutral-700">
      {entry.image && (
        <div className="md:w-1/2 md:h-96 h-64">
          <Link to={`/${entry.path}`}>
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-full object-cover rounded  md:rounded-t-none"
            />
          </Link>
        </div>
      )}
      <div className="md:py-10 md:px-10 py-4 md:w-1/2 flex flex-col justify-between space-y-4">
        <div>
          <div className="md:text-3xl text-xl font-semibold mb-6">
            {entry.title}
          </div>
          <div className="text-secondary  md:text-lg">{entry.description}</div>
        </div>
        <div className="pt-2">
          <Link to={`/${entry.path}`} className="text-primary hover:underline">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function EntriesList({
  entriesList,
}: {
  entriesList: Array<{
    title: string;
    description: string;
    path: string;
    image: string;
  }>;
}) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restEntries.map((item) => (
            <div key={item.path} className="mb-2 rounded flex-col flex">
              <div className="flex flex-col">
                <div>
                  {item.image && (
                    <Link to={`/${item.path}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full md:rounded-t rounded-t rounded-b h-full object-cover"
                      />
                    </Link>
                  )}
                </div>
              </div>
              <div className="py-4 px-4 dark:border-neutral-700 md:rounded-b border-neutral-300 flex flex-col space-y-2 border-b md:border-l md:border-r ">
                <div className="text-xl font-semibold">{item.title}</div>
                <div className="text-secondary text-base">
                  {item.description}
                </div>
                <div>
                  <Link to={`/${item.path}`}>read →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
