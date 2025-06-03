'use client';
import { useAuth } from '@/lib/auth/auth-context';
import { useParams } from 'next/navigation';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const params = useParams();
  const tenantId = params.tenantId;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Bienvenue sur votre tableau de bord, {user?.email}!
      </h2>
      <p className="text-gray-600">
        Ceci est la page principale de gestion pour l'université avec l'ID: {tenantId}.
      </p>
      <p className="text-gray-600">
        Votre ID utilisateur est : {user?.id} et votre ID d'université (tenant) est : {user?.universityId}.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Cards for modules/features */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-indigo-700">Gestion des Étudiants</h3>
          <p className="mt-2 text-sm text-gray-600">Accéder à la liste des étudiants, inscriptions, etc.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-indigo-700">Gestion des Cours</h3>
          <p className="mt-2 text-sm text-gray-600">Créer et gérer les programmes et les cours.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-indigo-700">Facturation & Abonnement</h3>
          <p className="mt-2 text-sm text-gray-600">Consulter vos factures et gérer votre abonnement.</p>
        </div>
      </div>
      {/* TODO: Add actual functionality, module selection, payment integration examples */}
    </div>
  );
}
