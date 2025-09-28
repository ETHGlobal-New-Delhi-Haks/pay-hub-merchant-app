import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

type Props = {
  open: boolean;
  setIsOpen: (val: boolean) => void;
  onEnd: VoidFunction;
};

export function BiometricCaptureDialog({ open, setIsOpen, onEnd }: Props) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (open && !captureComplete) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [open, captureComplete]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = async () => {
    setIsCapturing(true);

    // Simulate biometric capture process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsCapturing(false);
    setCaptureComplete(true);
    stopCamera();

    // Enable biometric authentication
    setIsOpen(true);
    // saveToStorage();

    // Show success for a moment, then close
    setTimeout(() => {
      setIsOpen(false);
      setCaptureComplete(false);
      onEnd();
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCaptureComplete(false);
    stopCamera();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify transaction by your face</DialogTitle>
          <DialogDescription>
            {captureComplete
              ? 'Biometric authentication enabled successfully!'
              : 'Position your face in the center of the frame'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          {!captureComplete ? (
            <>
              <div className="relative w-64 h-48 bg-gray-100 rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-[#003087] rounded-xl flex items-center justify-center">
                  <div className="w-32 h-40 border-2 border-[#003087] rounded-full opacity-50"></div>
                </div>
                {isCapturing && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003087]"></div>
                  </div>
                )}
              </div>
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className="mt-8 w-full items-center justify-center flex gap-2 w-full bg-green-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
              >
                <Camera className="h-4 w-4" />
                {isCapturing ? 'Capturing...' : 'Capture Face Data'}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-8">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-600 mb-2">Success!</h3>
                <p className="text-sm text-muted-foreground">
                  Biometric authentication enabled successfully!
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
