import Link from "next/link";
import { Button } from "@/components/ui/button";
import ExerciseList from "@/components/ExerciseList";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Hoş Geldin! ✨</h1>
      <p className="text-center text-gray-700">Bugün spora hazır mısın?</p>

      <ExerciseList />

      <div className="flex flex-col gap-4 mt-6 w-full max-w-md">
        <Link href="/tracker">
          <Button className="w-full">Adım Sayısı Takibi</Button>
        </Link>
        <Link href="/history">
          <Button className="w-full" variant="outline">
            Geçmişi Gör
          </Button>
        </Link>
      </div>
    </div>
  );
}
