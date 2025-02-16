import { getPerlengkapan } from "@/actions/perlengkapan";
import Content from "./content";

export default async function Home() {
  const data = await getPerlengkapan();
  console.log(JSON.stringify(data, null, 2));

  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-xl font-semibold text-center">
        Perlengkapan widodari 1.3
      </h1>
      <Content data={data} />
    </div>
  );
}
