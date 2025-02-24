import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { user_id, date, exercises } = req.body;

  const { data, error } = await supabase
    .from("workout_progress")
    .insert([{ user_id, date, exercises }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}
