import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const uploadData = [
  {
    id: 1,
    title: 'DOG WITH HAT',
    thumbnail_url: '/api/placeholder/400/320',
    preview_url: '/api/placeholder/400/320',
    dwg_ft_url: 'url',
    dwg_m_url: 'url',
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
  },
  {
    id: 2,
    title: 'MAN IN HOODIE',
    thumbnail_url: '/api/placeholder/400/320',
    preview_url: '/api/placeholder/400/320',
    dwg_ft_url: 'url',
    dwg_m_url: 'url',
    created_at: '2024-02-04T15:30:00Z',
    updated_at: '2024-02-04T15:30:00Z',
  },
];

function Uploads() {
  return (
    <div className="p-4">
      <h1 className="mx-4 mb-6 text-2xl font-bold">Uploads</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uploadData.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {/* {format(new Date(item.created_at), 'MMM d, yyyy')} */}
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 h-48 rounded-md bg-gray-200 object-contain" />
              {/* <Image
                src={item.thumbnail_url}
                alt={item.title}
                className="mb-4 h-48 w-full rounded-md object-cover"
              /> */}
              {/* <div className="flex gap-2">
                <button className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white">
                  <Download size={16} />
                  Files
                </button>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Uploads;
