import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

function Dashboard() {
  return (
    <div>
      <h1 className="p-8 text-4xl font-bold">WELCOME USER</h1>

      <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-3">
        {/* Card 1: Users */}
        <Card className="rounded-2xl p-4">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">12,345</span>
            <BarChart className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        {/* Card 2: Revenue */}
        <Card className="rounded-2xl p-4">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">$24,567</span>
            <LineChart className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        {/* Card 3: Orders */}
        <Card className="rounded-2xl p-4">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-4xl font-bold">8,234</span>
            <PieChart className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
