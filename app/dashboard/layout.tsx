export default async function Layout({ children }: { children: React.ReactNode }) {
  // route is protected only selected users can be admin
  // const supabase = await createClient();

  // Get the authenticated user

  // keeps rerunning each time
  // const { data: userData, error } = await supabase.auth.getUser();

  // if (error || !userData?.user) {
  //   redirect('/login'); // Redirect if not logged in
  // }

  // Fetch user role from Supabase
  // const { data: profile, error: roleError } = await supabase
  //   .from('profiles')
  //   .select('role')
  //   .eq('user_id', userData.user.id)
  //   .single();

  // console.log('data', JSON.stringify(profile, null, 2));

  // if (roleError || !profile || profile.role !== 'admin') {
  //   redirect('/'); // Redirect non-admins
  // }

  return (
    // <SidebarProvider>
    // <DashboardSidebar />
    <main className="flex flex-1 flex-col">
      {/* <>maybe add breakcrums next ot he dropdown on web</> */}
      {/* <SidebarTrigger /> */}
      {children}
    </main>
    // </SidebarProvider>
  );
}
