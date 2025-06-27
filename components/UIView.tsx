import React, { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, RefreshCw, Package, TrendingUp } from 'lucide-react';

// Mock data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Nguyễn Văn A',
    status: 'pending',
    total: '1,250,000',
    createdAt: '2025-06-13 10:30',
  },
  {
    id: 'ORD-002', 
    customer: 'Trần Thị B',
    status: 'completed',
    total: '850,000',
    createdAt: '2025-06-13 09:15',
  },
  {
    id: 'ORD-003',
    customer: 'Lê Minh C',
    status: 'processing',
    total: '2,100,000',
    createdAt: '2025-06-13 08:45',
  },
  {
    id: 'ORD-004',
    customer: 'Phạm Thị D',
    status: 'cancelled',
    total: '750,000',
    createdAt: '2025-06-12 16:20',
  },
];

const mockInventory = [
  {
    code: 'SP-001',
    name: 'Điện thoại iPhone 15',
    stock: 25,
    location: 'Kho A-1',
    lastUpdated: '2025-06-13 11:00',
  },
  {
    code: 'SP-002',
    name: 'Laptop Dell XPS 13',
    stock: 12,
    location: 'Kho B-2',
    lastUpdated: '2025-06-13 10:45',
  },
  {
    code: 'SP-003',
    name: 'Tai nghe AirPods Pro',
    stock: 8,
    location: 'Kho A-3',
    lastUpdated: '2025-06-13 09:30',
  },
  {
    code: 'SP-004',
    name: 'Máy tính bảng iPad Air',
    stock: 3,
    location: 'Kho C-1',
    lastUpdated: '2025-06-13 08:15',
  },
];

const statusVariants = {
  pending: 'secondary',
  processing: 'default',
  completed: 'success',
  cancelled: 'destructive',
} as const;

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function UIView() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="p-6 space-y-8">
      {/* Premium Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-high-contrast">Data Dashboard</h2>
        <p className="text-medium-contrast text-lg">
          Manage and monitor your warehouse operations and sales data
        </p>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-subtle font-medium">Số đơn hàng đã tạo</p>
                <p className="text-3xl font-bold text-high-contrast mt-2">1,234</p>
                <p className="text-sm text-success font-medium mt-1">+12% from last month</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-premium-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-subtle font-medium">Số phiếu đã in</p>
                <p className="text-3xl font-bold text-high-contrast mt-2">892</p>
                <p className="text-sm text-success font-medium mt-1">+8% from last month</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-premium-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Data Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="orders">Orders Management</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Control</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6 mt-6">
          <Card className="premium-elevated">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Recent Orders</CardTitle>
                  <p className="text-medium-contrast mt-2">Track and manage customer orders</p>
                </div>
                <Button variant="premium" className="shadow-premium-md">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Order ID</TableHead>
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Total Amount</TableHead>
                    <TableHead className="font-semibold">Created Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-premium">
                      <TableCell className="font-mono text-sm font-semibold">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[order.status as keyof typeof statusVariants]}>
                          {statusLabels[order.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{order.total} VNĐ</TableCell>
                      <TableCell className="text-medium-contrast">{order.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6 mt-6">
          <Card className="premium-elevated">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Inventory Status</CardTitle>
                  <p className="text-medium-contrast mt-2">Monitor stock levels and locations</p>
                </div>
                <Button variant="premium" className="shadow-premium-md">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Stock
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Product Code</TableHead>
                    <TableHead className="font-semibold">Product Name</TableHead>
                    <TableHead className="font-semibold">Stock Level</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventory.map((item) => (
                    <TableRow key={item.code} className="hover:bg-muted/50 transition-premium">
                      <TableCell className="font-mono text-sm font-semibold">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant={item.stock < 10 ? 'destructive' : 'success'}>
                          {item.stock} units
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.location}</TableCell>
                      <TableCell className="text-medium-contrast">{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}