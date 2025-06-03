import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenue sur la Plateforme Universitaire SaaS</h1>
        <p className="text-lg mb-8">Votre solution tout-en-un pour la gestion académique.</p>
        <div className="space-x-4">
          <Link href="/(auth)/sign-in" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Se Connecter
          </Link>
          <Link href="/onboarding/university" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Créer une Université
          </Link>
        </div>
      </div>
    </main>
  )
}
