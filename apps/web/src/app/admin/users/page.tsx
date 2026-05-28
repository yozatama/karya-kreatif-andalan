"use client";

import React from "react";
import { Search, Eye, ShieldCheck, Ban, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { adminUsers } from "@/lib/dashboard-mock-data";

export default function UsersPage() {
  const [search, setSearch] = React.useState("");
  const [verificationFilter, setVerificationFilter] = React.useState("all");
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<typeof adminUsers[0] | null>(null);

  const filtered = adminUsers.filter((u) => {
    if (verificationFilter !== "all" && u.verificationStatus !== verificationFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!u.firstName.toLowerCase().includes(s) && !u.lastName.toLowerCase().includes(s) && !u.email.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  const pendingUsers = adminUsers.filter((u) => u.verificationStatus === "pending");

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified": return <Badge className="bg-green-100 text-green-700">Terverifikasi</Badge>;
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "rejected": return <Badge variant="destructive">Ditolak</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Manajemen Pengguna</h2>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Semua Pengguna</TabsTrigger>
          <TabsTrigger value="verification">Antrian Verifikasi ({pendingUsers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari nama atau email..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {["all", "verified", "pending", "rejected"].map((status) => (
                    <Button
                      key={status}
                      variant={verificationFilter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setVerificationFilter(status)}
                    >
                      {status === "all" ? "Semua" : status === "verified" ? "Verified" : status === "pending" ? "Pending" : "Ditolak"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Verifikasi</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                              {user.firstName[0]}{user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{user.email}</TableCell>
                      <TableCell className="text-sm">{user.platform}</TableCell>
                      <TableCell>{getVerificationBadge(user.verificationStatus)}</TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setSelectedUser(user); setDetailOpen(true); }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Menunggu Verifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500">{user.email} - {user.platform}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" /> Setujui
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="h-4 w-4 mr-1" /> Tolak
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Pengguna</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  {getVerificationBadge(selectedUser.verificationStatus)}
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Telepon</span><span>{selectedUser.phone}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Platform</span><span>{selectedUser.platform}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Bergabung</span><span>{selectedUser.joinDate}</span></div>
              </div>
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Dokumen</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["KTP", "SIM", "Selfie"].map((doc) => (
                    <div key={doc} className="h-20 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs text-gray-400">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedUser.verificationStatus === "pending" && (
                <div className="space-y-2 border-t pt-3">
                  <Label>Alasan Penolakan (jika ditolak)</Label>
                  <Textarea placeholder="Masukkan alasan..." />
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" /> Setujui
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="h-4 w-4 mr-1" /> Tolak
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex gap-2 border-t pt-3">
                <Button variant="outline" size="sm" className="text-red-600">
                  <Ban className="h-4 w-4 mr-1" /> Suspend
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
