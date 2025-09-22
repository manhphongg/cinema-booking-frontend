"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Home, Armchair, CreditCard } from "lucide-react"

const roomTypes = [
  { id: 1, name: "Standard", capacity: 150, features: "Basic seating, Standard screen", status: "active" },
  { id: 2, name: "Premium", capacity: 120, features: "Leather seats, Dolby Atmos", status: "active" },
  { id: 3, name: "IMAX", capacity: 200, features: "IMAX screen, Premium sound", status: "active" },
  { id: 4, name: "VIP", capacity: 80, features: "Reclining seats, Food service", status: "inactive" },
]

const seatTypes = [
  { id: 1, name: "Regular", price: 12.0, description: "Standard cinema seat", status: "active" },
  { id: 2, name: "Premium", price: 18.0, description: "Leather reclining seat", status: "active" },
  { id: 3, name: "VIP", price: 25.0, description: "Luxury seat with table service", status: "active" },
  { id: 4, name: "Couple", price: 30.0, description: "Double seat for couples", status: "inactive" },
]

const paymentMethods = [
  { id: 1, name: "Credit Card", provider: "Stripe", status: "active", fees: "2.9% + $0.30" },
  { id: 2, name: "PayPal", provider: "PayPal", status: "active", fees: "3.4% + $0.30" },
  { id: 3, name: "Apple Pay", provider: "Stripe", status: "active", fees: "2.9% + $0.30" },
  { id: 4, name: "Bank Transfer", provider: "Manual", status: "inactive", fees: "Fixed $2.00" },
]

export function Settings() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("rooms")

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log(`Saved ${section} settings`)
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage system configurations and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="rooms">Room Types</TabsTrigger>
          <TabsTrigger value="seats">Seat Types</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Room Types
                </CardTitle>
                <CardDescription>Configure different types of cinema rooms</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Room Type
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Room Type</DialogTitle>
                    <DialogDescription>Add a new room type configuration</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="room-name">Room Type Name</Label>
                      <Input id="room-name" placeholder="e.g., Premium Plus" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-capacity">Capacity</Label>
                      <Input id="room-capacity" type="number" placeholder="e.g., 150" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-features">Features</Label>
                      <Input id="room-features" placeholder="e.g., Dolby Atmos, Leather seats" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-status">Status</Label>
                      <Select defaultValue="active">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Create Room Type</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomTypes.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium text-card-foreground">{room.name}</TableCell>
                      <TableCell className="text-card-foreground">{room.capacity} seats</TableCell>
                      <TableCell className="text-muted-foreground">{room.features}</TableCell>
                      <TableCell>{getStatusBadge(room.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seats" className="space-y-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Armchair className="w-5 h-5" />
                  Seat Types
                </CardTitle>
                <CardDescription>Configure different seat categories and pricing</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Seat Type
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seatTypes.map((seat) => (
                    <TableRow key={seat.id}>
                      <TableCell className="font-medium text-card-foreground">{seat.name}</TableCell>
                      <TableCell className="text-card-foreground">${seat.price.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground">{seat.description}</TableCell>
                      <TableCell>{getStatusBadge(seat.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Manage available payment options for customers</CardDescription>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Payment Method
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Transaction Fees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell className="font-medium text-card-foreground">{method.name}</TableCell>
                      <TableCell className="text-card-foreground">{method.provider}</TableCell>
                      <TableCell className="text-muted-foreground">{method.fees}</TableCell>
                      <TableCell>{getStatusBadge(method.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
