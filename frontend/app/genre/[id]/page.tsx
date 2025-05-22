import { Genre } from "@/app/types/genre";
import { Song } from "@/app/types/song";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function GenreInfo({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("genre")
    .select(
      `
      *,
      song (*)
    `
    )
    .eq("id", params.id)
    .single<Genre>();

  if (error) return <div className="text-center">Résultat introuvable</div>;

  return (
    <div>
      <Button>
        <Link href="/genre" className="flex items-center gap-2">
          <ArrowLeft />
          Back
        </Link>
      </Button>
      <h3 className="text-center text-3xl mb-4">{data.name}</h3>
      <div className="flex justify-center">
        {data.song.map((s) => (
          <CardSong key={s.id} song={{ ...s, genre_name: data.name }} />
        ))}
      </div>
    </div>
  );
}

function CardSong({ song }: { song: Song }) {
  return (
    <div className="border rounded p-2 flex flex-col gap-4 min-w-36">
      <h3 className="text-bold text-2xl">{song.name}</h3>
      <p className="text-right">{song.genre_name}</p>
    </div>
  );
}
