"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { CheckCircle, XCircle, Clock, Eye, DollarSign, TrendingUp, Calendar, Download } from "lucide-react"

const pendingApprovals = [
  {
    id: 1,
    type: "Movie",
    title: "Avatar: The Way of Water",
    manager: "John Smith",
    cinema: "Downtown Cinema",
    submittedDate: "2024-01-15",
    description: "New blockbuster movie addition with premium pricing",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    type: "Showtime",
    title: "Evening Schedule Update",
    manager: "Sarah Johnson",
    cinema: "Mall Cinema",
    submittedDate: "2024-01-14",
    description: "Extended evening showtimes for weekend",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    type: "Combo",
    title: "New Premium Snack Combo",
    manager: "Mike Wilson",
    cinema: "Airport Cinema",
    submittedDate: "2024-01-13",
    description: "Premium snack combo with imported treats",
    status: "pending",
    priority: "low",
  },
  {
    id: 4,
    type: "Voucher",
    title: "Student Discount Campaign",
    manager: "Emma Davis",
    cinema: "Downtown Cinema",
    submittedDate: "2024-01-12",
    description: "20% discount for students with valid ID",
    status: "pending",
    priority: "medium",
  },
]

const revenueReports = [
  { period: "Jan 2024", revenue: 125000, tickets: 8500, growth: 12.5 },
  { period: "Dec 2023", revenue: 118000, tickets: 7800, growth: 8.2 },
  { period: "Nov 2023", revenue: 109000, tickets: 7200, growth: -2.1 },
  { period: "Oct 2023", revenue: 111000, tickets: 7350, growth: 15.3 },
  { period: "Sep 2023", revenue: 96000, tickets: 6400, growth: 5.7 },
  { period: "Aug 2023", revenue: 91000, tickets: 6050, growth: -8.4 },
]

const dailyRevenue = [
  { date: "Mon", revenue: 15000, target: 18000 },
  { date: "Tue", revenue: 12000, target: 15000 },
  { date: "Wed", revenue: 14000, target: 16000 },
  { date: "Thu", revenue: 18000, target: 17000 },
  { date: "Fri", revenue: 25000, target: 22000 },
  { date: "Sat", revenue: 32000, target: 28000 },
  { date: "Sun", revenue: 28000, target: 25000 },
]

export function BusinessControl() {
  const [selectedApproval, setSelectedApproval] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      Movie: "bg-purple-100 text-purple-800",
      Showtime: "bg-blue-100 text-blue-800",
      Combo: "bg-orange-100 text-orange-800",
      Voucher: "bg-green-100 text-green-800",
    }
    return (
      <Badge className={`${colors[type as keyof typeof colors]} hover:${colors[type as keyof typeof colors]}`}>
        {type}
      </Badge>
    )
  }

  const handleApprove = (id: number) => {
    console.log(`Approved item ${id}`)
    // Handle approval logic
  }

  const handleReject = (id: number) => {
    console.log(`Rejected item ${id} with reason: ${rejectReason}`)
    // Handle rejection logic
    setRejectReason("")
  }

  const handleViewDetails = (approval: any) => {
    setSelectedApproval(approval)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Business Control</h1>
        <p className="text-muted-foreground mt-2">Manage approvals and monitor business performance</p>
      </div>

      {/* Business Control Tabs */}
      <Tabs defaultValue="approvals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="reports">Revenue Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-6">
          {/* Approval Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Pending</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">12</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">8</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">2</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">2.4h</div>
                <p className="text-xs text-muted-foreground">-30min from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals Table */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Pending Approvals</CardTitle>
              <CardDescription>Review and approve requests from cinema managers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Cinema</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>{getTypeBadge(approval.type)}</TableCell>
                      <TableCell className="font-medium text-card-foreground">{approval.title}</TableCell>
                      <TableCell className="text-card-foreground">{approval.manager}</TableCell>
                      <TableCell className="text-card-foreground">{approval.cinema}</TableCell>
                      <TableCell>{getPriorityBadge(approval.priority)}</TableCell>
                      <TableCell className="text-muted-foreground">{approval.submittedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(approval)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(approval.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Request</DialogTitle>
                                <DialogDescription>
                                  Please provide a reason for rejecting this request.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="reason">Rejection Reason</Label>
                                  <Textarea
                                    id="reason"
                                    placeholder="Enter reason for rejection..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleReject(approval.id)}>
                                  Reject Request
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">$125,000</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <p className="text-xs text-green-600">+12.5% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Weekly Average</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">$31,250</div>
                <p className="text-xs text-muted-foreground">Per week this month</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Daily Target</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">$4,464</div>
                <p className="text-xs text-muted-foreground">Average daily target</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground">Monthly Revenue Trend</CardTitle>
                  <CardDescription>Revenue performance over the last 6 months</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueReports}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="period" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Daily Performance</CardTitle>
                <CardDescription>This week's daily revenue vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Actual Revenue" />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Reports Table */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Detailed Revenue Reports</CardTitle>
              <CardDescription>Monthly breakdown with growth metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Tickets Sold</TableHead>
                    <TableHead>Growth Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-card-foreground">{report.period}</TableCell>
                      <TableCell className="text-card-foreground">${report.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-card-foreground">{report.tickets.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {report.growth > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          ) : (
                            <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                          )}
                          <span className={report.growth > 0 ? "text-green-600" : "text-red-600"}>
                            {report.growth > 0 ? "+" : ""}
                            {report.growth}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>Review the full details of this approval request</DialogDescription>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="mt-1">{getTypeBadge(selectedApproval.type)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedApproval.priority)}</div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="mt-1 text-card-foreground">{selectedApproval.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Manager</Label>
                <p className="mt-1 text-card-foreground">{selectedApproval.manager}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Cinema</Label>
                <p className="mt-1 text-card-foreground">{selectedApproval.cinema}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="mt-1 text-muted-foreground">{selectedApproval.description}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Submitted Date</Label>
                <p className="mt-1 text-muted-foreground">{selectedApproval.submittedDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedApproval) handleReject(selectedApproval.id)
                setIsViewDialogOpen(false)
              }}
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                if (selectedApproval) handleApprove(selectedApproval.id)
                setIsViewDialogOpen(false)
              }}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
