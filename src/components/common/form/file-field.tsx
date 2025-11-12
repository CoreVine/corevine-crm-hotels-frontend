"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload } from "lucide-react"

type Props = {
  label: string
  accept?: string
  onChange?: (file: File | null) => void
  setPreviewUrl?: (url: string) => void
}

export function FileField({ accept = "*", setPreviewUrl, label, onChange }: Props) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFileName(file?.name || null)
    if (onChange) {
      onChange(file)
    }
    if (file && setPreviewUrl) {
      const reader = URL.createObjectURL(file)
      setPreviewUrl(reader)
    }
  }

  const handleClearFile = () => {
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onChange) {
      onChange(null)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex items-center space-x-2">
        <Button type="button" variant="outline" className="w-full h-10" onClick={handleButtonClick}>
          <Upload className="w-4 h-4 mr-2" />
          {label}
        </Button>
        {fileName && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearFile}
            aria-label="Clear file selection"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {fileName && (
        <p className="text-sm text-muted-foreground truncate" title={fileName}>
          Selected: {fileName}
        </p>
      )}
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="absolute w-full hidden"
        ref={fileInputRef}
      />
    </div>
  )
}
