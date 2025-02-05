import { LucideUpload } from 'lucide-react';
import UploadForm from '../../../components/forms/upload/form';

function Upload() {
  return (
    <div className="flex max-w-3xl flex-col gap-4 px-12 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <LucideUpload />
          <h1 className="text-xl font-bold">Upload Element</h1>
        </div>
        <p className="text-sm">
          Let me know if any more forms are needed - also could add drag and drop later
        </p>
      </div>
      <UploadForm />
    </div>
  );
}

export default Upload;
