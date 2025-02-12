'use client';
import { toast } from 'sonner';
import { generateDownloadUrlAction } from '../../../actions/cloudflare/actions';
import { Button } from '../../ui/button';
// import {sonnar}

function DownloadForm({ id }: { id: string }) {
  async function handleDownloadAction() {
    try {
      const { data } = await generateDownloadUrlAction({ elementId: id, fileType: 'dwg-ft' });
      if (!data?.downloadUrl) {
        toast.error('Failed to generate download URL');
        return;
      }

      try {
        // Fetch the file content
        const response = await fetch(data.downloadUrl);
        const blob = await response.blob();

        // Check if the File System Access API is supported
        if (!('showSaveFilePicker' in window)) {
          // Create a blob URL to force download
          const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: 'image/svg+xml' }));
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `drawing-${id}.dwg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // Clean up the blob URL
          window.URL.revokeObjectURL(blobUrl);

          toast.success('Downloaded', {
            description: 'Your file will be saved to your downloads folder',
            duration: 5000,
          });
          return;
        }

        // Show the file save dialog
        // const handle = await (window as any).showSaveFilePicker({
        //   suggestedName: `drawing-${id}.dwg`,
        //   types: [
        //     {
        //       description: 'DWG File',
        //       accept: { 'image/svg+xml': ['.dwg'] },
        //     },
        //   ],
        // });

        // Write the file
        // const writable = await handle.createWritable();
        // await writable.write(blob);
        // await writable.close();

        toast.success('File saved successfully', {
          description: 'Your file has been saved to the location you chose',
          duration: 5000,
        });
      } catch (err: unknown) {
        // User cancelled the save dialog
        if (err && typeof err === 'object' && 'name' in err && err.name === 'AbortError') return;
        throw err;
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save file');
    }
  }
  return (
    <Button onClick={handleDownloadAction} type="submit">
      Download
    </Button>
  );
}

export default DownloadForm;

// const saveFile = async (blob, suggestedName) => {
//   // Feature detection. The API needs to be supported
//   // and the app not run in an iframe.
//   const supportsFileSystemAccess =
//     'showSaveFilePicker' in window &&
//     (() => {
//       try {
//         return window.self === window.top;
//       } catch {
//         return false;
//       }
//     })();
//   // If the File System Access API is supported…
//   if (supportsFileSystemAccess) {
//     try {
//       // Show the file save dialog.
//       const handle = await showSaveFilePicker({
//         suggestedName,
//       });
//       // Write the blob to the file.
//       const writable = await handle.createWritable();
//       await writable.write(blob);
//       await writable.close();
//       return;
//     } catch (err) {
//       // Fail silently if the user has simply canceled the dialog.
//       if (err.name !== 'AbortError') {
//         console.error(err.name, err.message);
//       }
//       return;
//     }
//   }
//   // Fallback if the File System Access API is not supported…
//   // Create the blob URL.
//   const blobURL = URL.createObjectURL(blob);
//   // Create the `<a download>` element and append it invisibly.
//   const a = document.createElement('a');
//   a.href = blobURL;
//   a.download = suggestedName;
//   a.style.display = 'none';
//   document.body.append(a);
//   // Programmatically click the element.
//   a.click();
//   // Revoke the blob URL and remove the element.
//   setTimeout(() => {
//     URL.revokeObjectURL(blobURL);
//     a.remove();
//   }, 1000);
// };
