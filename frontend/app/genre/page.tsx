import ModalGenre from "@/components/genre/modal.genre";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default async function Genre() {
  const supabase = createClient();
  const { data, error } = await supabase.from("genre").select("*");
  if (error) throw error;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Genre</h2>
        <ModalGenre />
      </div>
      <div className="flex gap-4">
        {data?.map((genre) => <CardGenre key={genre.id} genre={genre} />)}
      </div>
    </div>
  );
}

function CardGenre({ genre }: { genre: { id: string; name: string } }) {
  return (
    <div className="border rounded-md p-4 ">
      <Link href={`/genre/${genre.id}`}>
        <h3>{genre.name}</h3>
      </Link>
    </div>
  );
}
