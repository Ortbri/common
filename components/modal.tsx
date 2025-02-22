'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return createPortal(
    <div
      ref={overlay}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      onClick={handleClick}
    >
      <div ref={wrapper} className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <button onClick={onClose} className="absolute right-2 top-2 p-2 hover:bg-gray-100">
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body // TODO: find the proper way to render server side data for SEO
  );
}

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useCallback, useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';

// interface ModalProps {
//   children: React.ReactNode;
//   onClose: () => void;
// }

// export default function Modal({ children, onClose }: ModalProps) {
//   const overlay = useRef<HTMLDivElement>(null);
//   const wrapper = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const handleClick = useCallback(
//     (e: React.MouseEvent) => {
//       if (e.target === overlay.current || e.target === wrapper.current) {
//         onClose();
//       }
//     },
//     [onClose]
//   );

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     },
//     [onClose]
//   );

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [handleKeyDown]);

//   return createPortal(
//     <div
//       ref={overlay}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//       onClick={handleClick}
//     >
//       <div
//         ref={wrapper}
//         className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           ✕
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.getElementById('modal-root') || document.body
//   );
// }
