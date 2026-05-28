'use client';

import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect?: (file: File | null) => void;
  className?: string;
  preview?: boolean;
}

export function FileUpload({
  label = 'Upload file',
  accept = 'image/*',
  maxSize = 5,
  onFileSelect,
  className,
  preview = true,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (selectedFile: File | null) => {
      if (selectedFile && selectedFile.size > maxSize * 1024 * 1024) {
        alert(`Ukuran file maksimal ${maxSize}MB`);
        return;
      }
      setFile(selectedFile);
      if (selectedFile && preview) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
      onFileSelect?.(selectedFile);
    },
    [maxSize, onFileSelect, preview],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('w-full', className)}>
      {label && <p className="mb-2 text-sm font-medium">{label}</p>}
      {previewUrl && file ? (
        <div className="relative rounded-lg border overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt={file.name} className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="p-2 bg-muted text-xs truncate">{file.name}</div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50',
          )}
        >
          {isDragging ? (
            <ImageIcon className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Drag & drop atau klik untuk upload
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Maks. {maxSize}MB</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />
    </div>
  );
}
