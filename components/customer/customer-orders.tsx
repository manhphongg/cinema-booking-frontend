"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    movie: "Avatar: The Way of Water",
    showtime: "2024-01-15 19:30",
    seats: "A12, A13",
    total: 28.5,
    status: "Completed",
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    movie: "Top Gun: Maverick",
    showtime: "2024-01-20 21:00",
    seats: "B5, B6, B7",
    total: 42.75,
    status: "Completed",
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    movie: "Black Panther: Wakanda Forever",
    showtime: "2024-01-25 18:00",
    seats: "C10",
    total: 14.25,
    status: "Upcoming",
  },
  {
    id: "ORD-004",
    date: "2024-01-28",
    movie: "The Batman",
    showtime: "2024-01-28 20:30",
    seats: "D8, D9",
    total: 29.0,
    status: "Cancelled",
  },
  {
    id: "ORD-005",
    date: "2024-02-01",
    movie: "Spider-Man: No Way Home",
    showtime: "2024-02-01 16:00",
    seats: "E15, E16",
    total: 31.5,
    status: "Completed",
  },
  {
    id: "ORD-006",
    date: "2024-02-05",
    movie: "Dune: Part Two",
    showtime: "2024-02-05 20:00",
    seats: "F8",
    total: 15.75,
    status: "Upcoming",
  },
]

export function CustomerOrders() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = mockOrders.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Upcoming
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div id="view-orders" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Movie</TableHead>
                <TableHead>Showtime</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.movie}</TableCell>
                  <TableCell>{new Date(order.showtime).toLocaleString()}</TableCell>
                  <TableCell>{order.seats}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, mockOrders.length)} of{" "}
              {mockOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
