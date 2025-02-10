// 'use client';

// import { useState } from 'react';

// export default function AccountPage({ user }) {
//   const [message, setMessage] = useState('');

//   //   async function updateProfile(formData) {
//   //     const response = await fetch('/api/update-profile', {
//   //       method: 'POST',
//   //       body: JSON.stringify(formData),
//   //     });
//   //     if (response.ok) {
//   //       setMessage('Profile updated successfully!');
//   //     } else {
//   //       setMessage('Error updating profile.');
//   //     }
//   //   }

//   return (
//     <div>
//       <h1>Welcome, {user.first_name}</h1>
//       <form
//         onSubmit={e => {
//           //   e.preventDefault();
//           //   updateProfile(new FormData(e.target));
//         }}
//       >
//         <input type="text" name="first_name" defaultValue={user.first_name} />
//         <button type="submit">Update Profile</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
