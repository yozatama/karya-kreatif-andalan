'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users, Car, MapPin, Calendar, Shield, Zap, Heart, Award } from 'lucide-react';
import { stats } from '@/lib/mock-data';

const team = [
  { name: 'Ahmad Hidayat', role: 'CEO & Founder', avatar: '/placeholder/64x64.svg' },
  { name: 'Sri Mulyani', role: 'COO', avatar: '/placeholder/64x64.svg' },
  { name: 'Budi Hartono', role: 'CTO', avatar: '/placeholder/64x64.svg' },
  { name: 'Ratna Dewi', role: 'Head of Operations', avatar: '/placeholder/64x64.svg' },
];

const features = [
  { title: 'Terpercaya', description: 'Dipercaya oleh ribuan driver di seluruh Indonesia', icon: Shield },
  { title: 'Cepat & Efisien', description: 'Proses rental hanya dalam hitungan jam', icon: Zap },
  { title: 'Customer First', description: 'Layanan pelanggan yang mengutamakan kepuasan', icon: Heart },
  { title: 'Berpengalaman', description: 'Lebih dari 5 tahun melayani driver online', icon: Award },
];

const statItems = [
  { label: 'Driver Terlayani', value: stats.totalDrivers, icon: Users },
  { label: 'Unit Kendaraan', value: stats.totalVehicles, icon: Car },
  { label: 'Kota Operasi', value: stats.totalCities, icon: MapPin },
  { label: 'Tahun Berdiri', value: stats.totalYears, icon: Calendar },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Tentang Karya Kreatif Andalan
            </h1>
            <p className="mt-6 text-lg text-navy-200">
              Didirikan pada tahun 2019, kami hadir sebagai solusi transportasi bagi ribuan
              driver online di Indonesia. Misi kami sederhana: memberikan akses kendaraan
              berkualitas dengan harga terjangkau agar setiap driver bisa meraih penghidupan
              yang lebih baik.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-card p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-card-foreground">Misi Kami</h2>
              </div>
              <p className="text-muted-foreground">
                Menyediakan layanan rental kendaraan yang mudah, terjangkau, dan berkualitas
                untuk mendukung produktivitas driver online di seluruh Indonesia. Kami berkomitmen
                memberikan pengalaman terbaik dari proses pendaftaran hingga dukungan operasional
                sehari-hari.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-card-foreground">Visi Kami</h2>
              </div>
              <p className="text-muted-foreground">
                Menjadi platform rental kendaraan nomor satu untuk driver online di Asia Tenggara.
                Kami ingin menciptakan ekosistem transportasi yang berkelanjutan dengan menghadirkan
                lebih banyak kendaraan ramah lingkungan seperti motor listrik.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value.toLocaleString()}+</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            Kenapa Kami?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border bg-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
            Tim Kami
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-muted border flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
