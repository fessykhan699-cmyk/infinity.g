
'use client';

import React, { useState } from 'react';

const AdminVideoUploader: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('video', file);

    // Use XMLHttpRequest instead of fetch to track upload progress
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setStatus('success');
        setFile(null);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setStatus('error');
        try {
          const uploadResponse = JSON.parse(xhr.responseText);
          setErrorMessage(uploadResponse.error || 'Upload failed');
        } catch (parseError) {
          setErrorMessage('Upload failed');
        }
      }
      setUploading(false);
    });

    xhr.addEventListener('error', () => {
      setStatus('error');
      setErrorMessage('Network error occurred');
      setUploading(false);
    });

    xhr.open('POST', '/api/upload-video');
    xhr.send(formData);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4">
      {isExpanded && (
        <div className="glass-card p-5 md:p-6 rounded-[2rem] w-[calc(100vw-3rem)] sm:w-80 animate-in slide-in-from-bottom-4 fade-in duration-300 shadow-2xl border-primary/20 backdrop-blur-md">
          <div className="flex justify-between items-center mb-5 md:mb-6">
            <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Experience Manager</h4>
            <button onClick={() => setIsExpanded(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-500 hover:text-white transition-colors">
              <span className="material-icons-outlined text-sm">close</span>
            </button>
          </div>

          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-2xl p-5 md:p-6 text-center transition-all ${
                file ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <input 
                type="file" 
                accept="video/mp4" 
                onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    setStatus('idle');
                    setErrorMessage('');
                    setUploadProgress(0);
                }}
                className="hidden" 
                id="video-input"
              />
              <label htmlFor="video-input" className="cursor-pointer">
                <span className="material-icons-outlined text-2xl md:text-3xl text-slate-500 mb-2 block">
                  {file ? 'video_file' : 'cloud_upload'}
                </span>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest break-all px-2">
                  {file ? file.name : 'Update Hero Visual'}
                </p>
                <p className="text-[8px] text-slate-600 mt-1 uppercase">MP4 (Max 15MB)</p>
              </label>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Transferring Data</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full py-3.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30 flex items-center justify-center gap-2 active:scale-95"
            >
              {uploading ? (
                <>
                  <div className="animate-spin h-3 w-3 border-2 border-slate-400 border-t-black rounded-full"></div>
                  Uploading...
                </>
              ) : (
                'Deploy to Cloud'
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-green-400 animate-pulse">
                <span className="material-icons-outlined text-xs">check_circle</span>
                <p className="text-[9px] font-bold uppercase tracking-widest">
                  Live in 1s
                </p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="text-center space-y-1">
                <p className="text-[9px] text-accent font-bold uppercase tracking-widest">
                  Upload Error
                </p>
                <p className="text-[8px] text-slate-500 uppercase tracking-tighter line-clamp-1">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border border-white/10 active:scale-90 ${
          isExpanded ? 'bg-white text-black rotate-180' : 'bg-primary text-white hover:scale-110'
        }`}
      >
        <span className="material-icons-outlined text-xl md:text-2xl">{isExpanded ? 'expand_more' : 'settings'}</span>
      </button>
    </div>
  );
};

export default AdminVideoUploader;
