'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { onboardUniversity } from '@/lib/api'; // Assuming this calls the backend

export default function UniversityOnboardingPage() {
  const [formData, setFormData] = useState({
    universityName: '',
    subdomain: '', // Optional, might be derived from name or entered
    ownerEmail: '',
    ownerPassword: '',
    ownerFirstName: '',
    ownerLastName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (formData.ownerPassword.length < 8) {
        setError("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
    }

    try {
      const result = await onboardUniversity(formData);
      setSuccess(`Université "${result.name}" créée avec succès ! Vous pouvez maintenant vous connecter.`);
      // Potentially redirect to sign-in or a success page after a delay
      setTimeout(() => {
        router.push('/(auth)/sign-in');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to create university. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre Espace Université
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rejoignez notre plateforme et modernisez votre gestion académique.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="universityName" className="sr-only">Nom de l'université</label>
              <input id="universityName" name="universityName" type="text" required value={formData.universityName} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom de l'université (ex: Université de Dakar)" />
            </div>
            <div>
              <label htmlFor="subdomain" className="sr-only">Sous-domaine (Optionnel)</label>
              <input id="subdomain" name="subdomain" type="text" value={formData.subdomain} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Sous-domaine (ex: udakar - sera udakar.notreplateforme.com)" />
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 pt-4">Informations de l'Administrateur Principal</h3>
          <div className="rounded-md shadow-sm -space-y-px">
             <div>
              <label htmlFor="ownerFirstName" className="sr-only">Prénom</label>
              <input id="ownerFirstName" name="ownerFirstName" type="text" required value={formData.ownerFirstName} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Prénom de l'administrateur" />
            </div>
            <div>
              <label htmlFor="ownerLastName" className="sr-only">Nom</label>
              <input id="ownerLastName" name="ownerLastName" type="text" required value={formData.ownerLastName} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nom de l'administrateur" />
            </div>
            <div>
              <label htmlFor="ownerEmail" className="sr-only">Email de l'administrateur</label>
              <input id="ownerEmail" name="ownerEmail" type="email" autoComplete="email" required value={formData.ownerEmail} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email de l'administrateur" />
            </div>
            <div>
              <label htmlFor="ownerPassword" className="sr-only">Mot de passe</label>
              <input id="ownerPassword" name="ownerPassword" type="password" required value={formData.ownerPassword} onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe (min 8 caractères)" />
            </div>
          </div>

          {/* Placeholder for module selection and payment options */}
          <div className="pt-4">
            <h3 className="text-md font-medium text-gray-700">Modules & Paiement (Simplifié pour le Starter)</h3>
            <p className="text-sm text-gray-500">La sélection détaillée des modules et la configuration des paiements seront disponibles dans votre tableau de bord après la création.</p>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center">{success}</p>}

          <div>
            <button type="submit" disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {isLoading ? 'Création en cours...' : "Créer l'université"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
