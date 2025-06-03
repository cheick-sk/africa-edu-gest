'use client';
import { useAuth } from '@/lib/auth/auth-context';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Paramètres de l'Université</h2>
      <div className="bg-white p-8 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Informations du Compte</h3>
        <p className="text-gray-600"><span className="font-medium">Email Administrateur:</span> {user?.email}</p>
        <p className="text-gray-600"><span className="font-medium">ID Université:</span> {user?.universityId}</p>

        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Branding (Exemple)</h4>
            {/* Form elements for branding customization would go here */}
            <p className="text-sm text-gray-500">Personnalisez le logo, les couleurs, etc.</p>
        </div>

        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Modules Actifs (Exemple)</h4>
            {/* List of modules and toggles to activate/deactivate */}
            <p className="text-sm text-gray-500">Gérez les fonctionnalités disponibles pour votre université.</p>
        </div>

        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Configuration des Paiements (Exemple)</h4>
            {/* Options to select and configure payment methods */}
            <p className="text-sm text-gray-500">Choisissez comment vous souhaitez gérer les paiements des étudiants ou de l'abonnement.</p>
        </div>

      </div>
    </div>
  );
}
