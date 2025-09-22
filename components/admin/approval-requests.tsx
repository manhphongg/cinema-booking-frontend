"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, AlertCircle, Filter } from "lucide-react"

type ApprovalStatus = "all" | "pending" | "approved" | "rejected"

export function ApprovalRequests() {
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus>("all")

  const approvalRequests = [
    {
      id: 1,
      type: "Movie",
      title: "Avatar: The Way of Water",
      manager: "John Smith",
      date: "2024-01-15",
      status: "pending",
      description: "Request to add new movie to screening schedule",
      priority: "high",
    },
    {
      id: 2,
      type: "Showtime",
      title: "Evening Schedule Update",
      manager: "Sarah Johnson",
      date: "2024-01-14",
      status: "pending",
      description: "Update evening showtimes for weekend",
      priority: "medium",
    },
    {
      id: 3,
      type: "Combo",
      title: "New Popcorn Combo",
      manager: "Mike Wilson",
      date: "2024-01-13",
      status: "approved",
      description: "Add new family-size popcorn combo deal",
      priority: "low",
    },
    {
      id: 4,
      type: "Staff",
      title: "New Staff Account",
      manager: "Emma Davis",
      date: "2024-01-12",
      status: "pending",
      description: "Create account for new ticket counter staff",
      priority: "medium",
    },
    {
      id: 5,
      type: "Pricing",
      title: "Weekend Price Adjustment",
      manager: "David Brown",
      date: "2024-01-11",
      status: "rejected",
      description: "Increase weekend ticket prices by 15%",
      priority: "high",
    },
  ]

  const filteredRequests = approvalRequests.filter(
    (request) => statusFilter === "all" || request.status === statusFilter,
  )

  const handleApprove = (id: number) => {
    console.log("[v0] Approving request:", id)
    // Handle approval logic here
  }

  const handleReject = (id: number) => {
    console.log("[v0] Rejecting request:", id)
    // Handle rejection logic here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approval Requests</h1>
          <p className="text-muted-foreground mt-2">Review and process manager submissions</p>
        </div>
        <Select value={statusFilter} onValueChange={(value: ApprovalStatus) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px] bg-card">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {request.type}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-1">{request.title}</h3>

                  <p className="text-sm text-muted-foreground mb-3">{request.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>By {request.manager}</span>
                    <span>•</span>
                    <span>{request.date}</span>
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 bg-transparent border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 bg-transparent border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="bg-card">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No requests found</h3>
            <p className="text-muted-foreground">There are no approval requests matching your current filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
