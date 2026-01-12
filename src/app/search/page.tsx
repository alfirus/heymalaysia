import { searchPlaces } from '@/actions/search-places';
import { SearchBar } from './search-bar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Assuming you might have a badge, if not I'll remove it or create it. Checking if badge exists is safer, but standard shadcn has it. I'll stick to basic divs or check first. Actually I saw 'ui' folder contained only button, card, input, label. I should probably verify types/badges before using. I will use simple divs/spans for now to be safe.
import IndexCssUtils from '@/app/globals.css'; // Just to ensure tailwind works, usually not needed to import css in page.tsx if layout has it.

export const metadata = {
  title: 'Search Places | HeyMalaysia',
  description: 'Search for places in Malaysia.',
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  const { data: places, error } = await searchPlaces(q);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8 space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Search Places</h1>
        <p className="text-muted-foreground">
          Find businesses, points of interest, and more across Malaysia.
        </p>
        <SearchBar />
      </div>

      {error && (
        <div className="text-center text-red-500 mb-8">
          <p>Error: {error}</p>
        </div>
      )}

      {!q && !places?.length && (
         <div className="text-center text-muted-foreground mt-12">
            <p>Enter a keyword to start searching.</p>
         </div>
      )}

      {q && places?.length === 0 && (
        <div className="text-center text-muted-foreground mt-12">
          <p>No results found for "{q}".</p>
        </div>
      )}

      {places && places.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Card key={place._id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl line-clamp-1" title={place.name}>{place.name}</CardTitle>
                    {place.rating && (
                        <div className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 border border-yellow-200">
                             ★ {place.rating}
                        </div>
                    )}
                </div>
                <CardDescription className="line-clamp-2" title={place.formatted_address}>
                  {place.formatted_address}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {place.types && place.types.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.types.slice(0, 3).map((type: string) => (
                      <span key={type} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 capitalize">
                        {type.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {place.types.length > 3 && (
                        <span className="text-xs text-muted-foreground self-center">+{place.types.length - 3} more</span>
                    )}
                  </div>
                )}
                 <div className="text-sm text-muted-foreground space-y-1">
                    {place.harvested_from?.state && (
                        <p><strong>State:</strong> {place.harvested_from.state}</p>
                    )}
                     {place.harvested_from?.district && (
                        <p><strong>District:</strong> {place.harvested_from.district}</p>
                    )}
                 </div>
              </CardContent>
               {/* Optional Footer content */}
               {/* <CardFooter>
                 <Button variant="outline" className="w-full">View Details</Button>
               </CardFooter> */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
