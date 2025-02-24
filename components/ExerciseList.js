"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const exercises = [
  {
    id: 1,
    name: "Yürüyüş Yerinde",
    category: "Isınma",
    description: "Yerinizde hafif tempolu yürüyüş yaparak kaslarınızı ısıtın.",
    duration: "2-3 dakika",
    gif: "/exercises/walking.webp",
  },
  {
    id: 2,
    name: "Sandalyede Bacak Kaldırma",
    category: "Ana Egzersiz",
    description: `Sandalye, koltuk benzeri bir yere oturun. \n
                  Bandınızı (şart değil) çalıştıracağınız bacağa bağlayıp diğer bacak ile arkadan tutunuz. \n
                  Nefes alın ve bacağınız dik olana kadar kaldırırken nefes verin. \n
                  3 sn kadar dik tuttuktan sonra kontrollü bir şekilde bacağınızı indirin. \n
                  Sadece ağrılı dizi çalıştıracağınız gibi iki dizi de çalıştırabilirsiniz. `,
    duration: "3 set 10 tekrar",
    gif: "/exercises/sandalyede-bacak-kaldirma.jpeg",
  },
  {
    id: 3,
    name: "Hamstring Kaydırma",
    category: "Ana Egzersiz",
    description: `Sırt üstü uzanın, bacaklarınız bükük olsun. \n
                  Ayaklarınızın altına kayabilecek havlu benzeri bir cisim yerleştirin. \n
                  Kalçanızı kaldırarak köprü pozisyonuna gelin. \n
                  Ayaklarınızı kalçanız yere değmeyecek kadar kaydırın ve geri toplayıp ilk pozisyona gelin.`,
    duration: "2 set 10 tekrar",
    gif: "/exercises/hamstring-kaydirma.gif",
  },
  {
    id: 4,
    name: "Duvarda Squat",
    category: "Ana Egzersiz",
    description: `Duvara yaslanarak ayakta durun. \n
                  Ayaklarınız biraz önde olsun ki çömelme hareketini yaparken dizleriniz zarar görmesin. \n
                  Nefes alarak uyluk kemiğiniz yere paralel olana kadar çömelin ve sırtınız duvardan ayrılmasın. \n
                  Nefes vererek sırtınızı duvardan ayırmadan ve ilk pozisyona gelin. \n
                  Yardımcı olarak altınıza bir tabure - sandalye koyabilirsiniz.`,
    duration: "2 set 10 tekrar",
    gif: "/exercises/duvarda-squat.gif",
  },
  {
    id: 5,
    name: "Diz Sıkıştırma",
    category: "Ana Egzersiz",
    description: `Düz bir zemine bacaklarınızı uzatarak oturun.\n
                  Dizlerinizin arasına rulo yapılmış bir havluyu destek olarak koyun. \n
                  Dizlerinizi birbirine doğru bastırın. \n
                  Bu pozisyonda 5 saniye bekleyip gevşetin.`,
    duration: "2 set 10 tekrar",
    gif: "/exercises/diz-birlestirme.jpg",
  },
  {
    id: 6,
    name: "Sandalyede Kalf",
    category: "Ana Egzersiz",
    description: `Topuklarınız yere değecek şekilde bir sandalyeye oturun. \n
                  Topuklarınız yere değer vaziyette ayak uçlarınızı yukarıya doğru kaldırın. \n
                  Daha sonra ayak uçlarınızı yere doğru bastırarak topuklarınızı yukarı doğru kaldırın.`,
    duration: "2 set 10 tekrar",
    gif: "/exercises/sandalyede-kalf.png",
  },
  {
    id: 7,
    name: "Yan Yatışta İç Bacak Kaldırma",
    category: "Ana Egzersiz",
    description: `Yan yatın ve bir bacağını öne koyun. \n
                  Üst bacağınızı yere paralel olacak şekilde kaldırın. \n`,
    duration: "2 set 10 tekrar",
    gif: "/exercises/yan-yatista-bacak-kaldirma.gif",
  },
];

export default function ExerciseList() {
  const [completedExercises, setCompletedExercises] = useState([]);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  const toggleExercise = (id) => {
    setCompletedExercises((prev) =>
      prev.includes(id) ? prev.filter((exId) => exId !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const markAllCompleted = async () => {
    setDailyCompleted(true);
    setCompletedExercises(exercises.map((exercise) => exercise.id));
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">
        Egzersiz Listesi
      </h2>
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className={`mb-3 ${
            completedExercises.includes(exercise.id) ? "bg-green-200" : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{exercise.name}</h3>
                <p className="text-sm text-gray-600">{exercise.category}</p>
              </div>
              <button onClick={() => toggleExpand(exercise.id)}>
                {expandedExercise === exercise.id ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
            </div>
            {expandedExercise === exercise.id && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mt-1">
                  Süre: {exercise.duration}
                </p>
                <Image
                  src={exercise.gif}
                  alt={exercise.name}
                  className="mt-2 w-full rounded-md"
                />
                <p className="mt-1 text-sm whitespace-pre-line">
                  {exercise.description}
                </p>
              </div>
            )}
            <Button
              onClick={() => toggleExercise(exercise.id)}
              className="mt-2 w-full"
            >
              {completedExercises.includes(exercise.id)
                ? "Tamamlandı"
                : "Tamamla"}
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={markAllCompleted}
        className={`mt-4 w-full ${
          dailyCompleted ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {dailyCompleted ? "Günü Sıfırla" : "Tümünü Tamamla"}
      </Button>
    </div>
  );
}
