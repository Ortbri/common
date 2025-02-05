import UploadForm from '../../../components/forms/upload/form';

function Upload() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold">Upload Element</h1>
      <p>4 files are required to upload * if more are needed let me know!</p>
      <UploadForm />
    </div>
  );
}

export default Upload;
