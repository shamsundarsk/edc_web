// Reusable image upload component
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  imageUrl?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => void;
  uploading?: boolean;
  className?: string;
  shape?: 'square' | 'circle';
  label?: string;
}

export function ImageUpload({
  imageUrl,
  onUpload,
  onRemove,
  uploading = false,
  className = '',
  shape = 'square',
  label = 'Upload Image',
}: ImageUploadProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  if (imageUrl) {
    return (
      <div className={`relative group ${className}`}>
        <img 
          src={imageUrl} 
          alt="Preview" 
          className={`w-32 h-32 object-cover ${shapeClass} border-2 border-charcoal/10`} 
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <label className={`flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-charcoal/20 ${shapeClass} cursor-pointer hover:border-primary hover:bg-primary/5 transition-all ${className}`}>
      {uploading ? (
        <>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mb-2"></div>
          <span className="text-xs text-charcoal-light/60 font-sans">Uploading...</span>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 text-charcoal-light/40 mb-2" />
          <span className="text-xs text-charcoal-light/60 font-sans">{label}</span>
        </>
      )}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />
    </label>
  );
}
