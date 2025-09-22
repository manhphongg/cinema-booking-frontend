"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockVouchers = [
  {
    id: "VOUCHER-001",
    code: "WELCOME20",
    discount: "20% Off",
    expiry: "2024-03-15",
    status: "Unused",
  },
  {
    id: "VOUCHER-002",
    code: "BIRTHDAY50",
    discount: "$5.00 Off",
    expiry: "2024-02-28",
    status: "Used",
  },
  {
    id: "VOUCHER-003",
    code: "LOYALTY15",
    discount: "15% Off",
    expiry: "2024-04-30",
    status: "Unused",
  },
  {
    id: "VOUCHER-004",
    code: "EXPIRED10",
    discount: "10% Off",
    expiry: "2024-01-10",
    status: "Used",
  },
  {
    id: "VOUCHER-005",
    code: "SUMMER25",
    discount: "25% Off",
    expiry: "2024-06-30",
    status: "Unused",
  },
]

export function CustomerVouchers() {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "unused":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Unused
          </Badge>
        )
      case "used":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Used
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div id="view-vouchers" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Vouchers</h1>
      </div>

      {/* Vouchers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Voucher Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-mono font-medium">{voucher.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {voucher.discount}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(voucher.expiry).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(voucher.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
