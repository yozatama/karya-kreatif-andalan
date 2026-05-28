'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Scan, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetectionResult {
  id: string;
  area: string;
  severity: 'ringan' | 'sedang' | 'berat' | 'baik';
  description: string;
  confidence: number;
  position: { x: number; y: number; w: number; h: number };
}

const mockResults: DetectionResult[] = [
  {
    id: '1',
    area: 'Bumper Depan',
    severity: 'ringan',
    description: 'Lecet ringan di bumper depan bagian kiri',
    confidence: 87,
    position: { x: 15, y: 70, w: 20, h: 15 },
  },
  {
    id: '2',
    area: 'Panel Samping Kanan',
    severity: 'baik',
    description: 'Kondisi baik - tidak ada kerusakan terdeteksi',
    confidence: 95,
    position: { x: 60, y: 40, w: 25, h: 30 },
  },
  {
    id: '3',
    area: 'Kap Mesin',
    severity: 'ringan',
    description: 'Goresan halus pada permukaan kap mesin',
    confidence: 72,
    position: { x: 30, y: 20, w: 30, h: 20 },
  },
];

export function DamageDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DetectionResult[] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setResults(null);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(mockResults);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'ringan':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300';
      case 'sedang':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 border-orange-300';
      case 'berat':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 border-red-300';
      case 'baik':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 border-green-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'baik':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const overallScore = results
    ? Math.round(results.reduce((acc, r) => acc + r.confidence, 0) / results.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Scan className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Deteksi Kerusakan</h3>
      </div>

      {/* Upload area */}
      {!uploadedImage && (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Upload foto kendaraan untuk analisis
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG, atau WebP (maks. 10MB)
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}

      {/* Image with overlay */}
      {uploadedImage && (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={uploadedImage}
            alt="Foto kendaraan"
            className="w-full h-64 object-cover"
          />

          {/* Detection overlay */}
          {results && (
            <div className="absolute inset-0">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`absolute border-2 rounded ${
                    result.severity === 'baik'
                      ? 'border-green-400'
                      : result.severity === 'ringan'
                      ? 'border-yellow-400'
                      : 'border-red-400'
                  }`}
                  style={{
                    left: `${result.position.x}%`,
                    top: `${result.position.y}%`,
                    width: `${result.position.w}%`,
                    height: `${result.position.h}%`,
                  }}
                >
                  <div
                    className={`absolute -top-5 left-0 text-[10px] px-1 rounded ${
                      result.severity === 'baik'
                        ? 'bg-green-400 text-green-900'
                        : result.severity === 'ringan'
                        ? 'bg-yellow-400 text-yellow-900'
                        : 'bg-red-400 text-red-900'
                    }`}
                  >
                    {result.area}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Analyzing overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">Menganalisis gambar...</p>
                <p className="text-xs opacity-80">AI sedang mendeteksi kerusakan</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              size="sm"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Analisis...
                </>
              ) : (
                <>
                  <Scan className="h-4 w-4 mr-1" />
                  Analisis
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setUploadedImage(null);
                setResults(null);
              }}
              className="bg-background"
            >
              Ganti Foto
            </Button>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Summary card */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Ringkasan Analisis</h4>
              <div className="text-xs text-muted-foreground">
                Skor Kepercayaan: {overallScore}%
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{overallScore}%</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Kondisi: {results.filter((r) => r.severity !== 'baik').length === 0 ? 'Sangat Baik' : 'Perlu Perhatian'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {results.filter((r) => r.severity !== 'baik').length} area terdeteksi perlu perhatian
                </p>
              </div>
            </div>
          </div>

          {/* Detail results */}
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.id}
                className={`rounded-lg border p-3 ${getSeverityColor(result.severity)}`}
              >
                <div className="flex items-start gap-2">
                  {getSeverityIcon(result.severity)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{result.area}</p>
                      <span className="text-xs opacity-80">
                        {result.confidence}% yakin
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 opacity-90">{result.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
