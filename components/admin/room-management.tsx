"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Room {
  id: string
  name: string
  type: string
  capacity: number
  status: "active" | "inactive"
}

interface RoomManagementProps {
  onSelectRoom: (roomId: string) => void
}

export function RoomManagement({ onSelectRoom }: RoomManagementProps) {
  const { toast } = useToast()
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Phòng 1", type: "Standard", capacity: 100, status: "active" },
    { id: "2", name: "Phòng 2", type: "VIP", capacity: 80, status: "active" },
    { id: "3", name: "Phòng 3", type: "IMAX", capacity: 150, status: "inactive" },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
    status: "active" as "active" | "inactive",
  })

  const handleSubmit = () => {
    if (editingRoom) {
      setRooms(
        rooms.map((r) =>
          r.id === editingRoom.id ? { ...editingRoom, ...formData, capacity: Number(formData.capacity) } : r,
        ),
      )
      toast({ title: "Cập nhật thành công", description: "Phòng chiếu đã được cập nhật" })
    } else {
      const newRoom: Room = {
        id: Date.now().toString(),
        ...formData,
        capacity: Number(formData.capacity),
      }
      setRooms([...rooms, newRoom])
      toast({ title: "Thêm thành công", description: "Phòng chiếu mới đã được thêm" })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id))
    toast({ title: "Xóa thành công", description: "Phòng chiếu đã được xóa" })
  }

  const resetForm = () => {
    setFormData({ name: "", type: "", capacity: "", status: "active" })
    setEditingRoom(null)
  }

  const openEditDialog = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity.toString(),
      status: room.status,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Phòng chiếu</h1>
          <p className="text-muted-foreground mt-1">Quản lý phòng chiếu và cấu hình ghế ngồi</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Thêm phòng mới
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card text-card-foreground border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingRoom ? "Sửa phòng chiếu" : "Thêm phòng mới"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-foreground">
                  Tên phòng
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-foreground">
                  Loại phòng
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Chọn loại phòng" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="IMAX">IMAX</SelectItem>
                    <SelectItem value="4DX">4DX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity" className="text-foreground">
                  Sức chứa
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-foreground">
                  Trạng thái
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  resetForm()
                }}
                className="border-border text-foreground hover:bg-muted"
              >
                Hủy
              </Button>
              <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Lưu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-card border-border p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Tên phòng</TableHead>
              <TableHead className="text-muted-foreground">Loại phòng</TableHead>
              <TableHead className="text-muted-foreground">Sức chứa</TableHead>
              <TableHead className="text-muted-foreground">Trạng thái</TableHead>
              <TableHead className="text-muted-foreground">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id} className="border-border hover:bg-muted/30">
                <TableCell className="font-medium text-foreground">{room.name}</TableCell>
                <TableCell className="text-foreground">{room.type}</TableCell>
                <TableCell className="text-foreground">{room.capacity} ghế</TableCell>
                <TableCell>
                  <Badge
                    variant={room.status === "active" ? "default" : "secondary"}
                    className={
                      room.status === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }
                  >
                    {room.status === "active" ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(room)}
                      className="text-foreground hover:bg-muted"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(room.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onSelectRoom(room.id)}
                      className="text-primary hover:bg-primary/10"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
