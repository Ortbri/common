import { FileIcon, UploadIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface DropzoneProps {
  onChange: (file: File) => void;
  className?: string;
  fileExtension?: string;
}

// Helper function to merge multiple refs.
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(value);
      } else {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export const Dropzone = React.forwardRef<HTMLInputElement, DropzoneProps>(
  ({ onChange, className, fileExtension, ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      const { files } = e.dataTransfer;
      handleUpload(files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files) {
        handleUpload(files);
      }
    };

    const handleUpload = (files: FileList) => {
      const uploadedFile = files[0];

      if (!uploadedFile) {
        return;
      }

      if (
        fileExtension &&
        !uploadedFile.name.toLowerCase().endsWith(`.${fileExtension.toLowerCase()}`)
      ) {
        setErrorMessage(`Invalid file type. Expected: .${fileExtension}`);
        return;
      }

      setErrorMessage('');
      onChange(uploadedFile);
    };

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <Card
        className={`border-2 border-dashed bg-muted hover:cursor-pointer ${
          isDraggingOver ? 'border-blue-500' : 'border-muted-foreground/50'
        } ${errorMessage ? 'border-red-800' : ''} ${className}`}
        {...props}
        onDragLeave={() => setIsDraggingOver(false)}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-6 py-6 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-1 p-4 text-center text-muted-foreground">
            <UploadIcon className="mb-2 h-6 w-6" />
            <h6 className="text-md font-semibold">Drop file here</h6>
            <p className="text-xs text-gray-400">or</p>
            <Button
              size="sm"
              onClick={handleButtonClick}
              variant="outline"
              className="m-auto mt-1 flex h-8 space-x-2 px-3 text-xs"
            >
              <FileIcon className="h-3.5 w-3.5" />
              <span>Select files</span>
            </Button>
            <input
              ref={mergeRefs(fileInputRef, ref)}
              type="file"
              accept={`.${fileExtension}`}
              onChange={handleFileInputChange}
              className="hidden"
              multiple
            />
          </div>
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        </CardContent>
      </Card>
    );
  }
);

// Assign a display name to the component for debugging purposes.
Dropzone.displayName = 'Dropzone';
