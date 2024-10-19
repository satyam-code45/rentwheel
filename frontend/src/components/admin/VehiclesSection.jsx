"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { apiService } from "@/lib/apiService"

export default function VehiclesSection() {
  const [vehicles, setVehicles] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentVehicle, setCurrentVehicle] = useState(null)
  const [newVehicle, setNewVehicle] = useState({ name: "", type: "", status: "" })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchVehicles()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm])

  const fetchVehicles = async () => {
    try {
      const response = await apiService.getVehicles(page, searchTerm)
      setVehicles(response.vehicles)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.error("Failed to fetch vehicles:", error)
    }
  }

  const handleAddVehicle = async () => {
    try {
      await apiService.addVehicle(newVehicle)
      setIsAddDialogOpen(false)
      setNewVehicle({ name: "", type: "", status: "" })
      fetchVehicles()
    } catch (error) {
      console.error("Failed to add vehicle:", error)
    }
  }

  const handleEditVehicle = async () => {
    if (!currentVehicle) return
    try {
      await apiService.updateVehicle(currentVehicle.id, currentVehicle)
      setIsEditDialogOpen(false)
      setCurrentVehicle(null)
      fetchVehicles()
    } catch (error) {
      console.error("Failed to update vehicle:", error)
    }
  }

  const handleDeleteVehicle = async (id) => {
    try {
      await apiService.deleteVehicle(id)
      fetchVehicles()
    } catch (error) {
      console.error("Failed to delete vehicle:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Vehicles</h2>
        <div className="flex space-x-2">
          <Input
            type="search"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>Enter the details of the new vehicle.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input
                    id="type"
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Input
                    id="status"
                    value={newVehicle.status}
                    onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setCurrentVehicle(vehicle)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit  Vehicle</DialogTitle>
                        <DialogDescription>Edit the details of the vehicle.</DialogDescription>
                      </DialogHeader>
                      {currentVehicle && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={currentVehicle.name}
                              onChange={(e) =>
                                setCurrentVehicle({ ...currentVehicle, name: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-type" className="text-right">
                              Type
                            </Label>
                            <Input
                              id="edit-type"
                              value={currentVehicle.type}
                              onChange={(e) =>
                                setCurrentVehicle({ ...currentVehicle, type: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-status" className="text-right">
                              Status
                            </Label>
                            <Input
                              id="edit-status"
                              value={currentVehicle.status}
                              onChange={(e) =>
                                setCurrentVehicle({ ...currentVehicle, status: e.target.value })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button onClick={handleEditVehicle}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" onClick={() => handleDeleteVehicle(vehicle.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}