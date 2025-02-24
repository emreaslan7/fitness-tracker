import CalendarTracker from "../../components/CalenderTracker";

export default function Tracker() {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">
        Günlük Adım Takibi
      </h1>

      <CalendarTracker />
    </div>
  );
}
