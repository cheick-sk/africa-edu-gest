'use client';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
// import { LogOut } from 'lucide-react'; // Example icon

// Basic Sidebar and Header for Dashboard
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const tenantId = params.tenantId as string;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/(auth)/sign-in');
    }
    // Optional: verify that user.universityId matches tenantId from URL
    if (!isLoading && user && user.universityId !== tenantId) {
        console.warn("User's tenant ID does not match URL tenant ID. Redirecting or handling error.");
        // signOut(); // Or redirect to user's correct dashboard, or show error
        router.push(`/(dashboard)/${user.universityId}`); // Redirect to correct dashboard
    }
  }, [user, isLoading, router, tenantId]);

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center">Chargement du tableau de bord...</div>;
  }

  if (user.universityId !== tenantId) {
    return <div className="flex min-h-screen items-center justify-center">Accès non autorisé ou mauvaise URL de tableau de bord.</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-6">
        <div className="text-xl font-semibold">Tableau de Bord</div>
        <nav className="space-y-2">
          <Link href={`/(dashboard)/${tenantId}`} className="block py-2 px-3 rounded hover:bg-gray-700">Accueil</Link>
          <Link href={`/(dashboard)/${tenantId}/settings`} className="block py-2 px-3 rounded hover:bg-gray-700">Paramètres</Link>
          {/* Add more links: Students, Courses, Billing, etc. */}
        </nav>
        <button
            onClick={signOut}
            className="w-full mt-auto flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {/* <LogOut className="mr-2 h-4 w-4" /> */}
            Déconnexion
          </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4">
          <h1 className="text-xl font-semibold text-gray-800">Université {user.email} (ID: {tenantId})</h1>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
