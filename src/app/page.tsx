import { getPerlengkapan } from "@/actions/perlengkapan";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const data = await getPerlengkapan();
  return (
    <div className="container mx-auto pt-8">
      <h1 className="text-xl font-semibold text-center">
        Perlengkapan widodari 1.3
      </h1>
      <Card className="p-4">
        {" "}
        {/* Memberikan padding di card */}
        {data?.map((item) => (
          <div key={item.id} className="mb-4">
            {" "}
            {/* Memberikan margin bawah antar item */}
            <div>
              <span className="font-bold">{item.name}</span>
            </div>
            <ol className="list-decimal pl-5">
              {" "}
              {/* Memberikan padding kiri untuk nomor */}
              {item.kebutuhan.map((item) => (
                <li key={item.id}>{`${
                  item.name
                } : ${item.jumlah.toString()}`}</li>
              ))}
            </ol>
          </div>
        ))}
      </Card>
    </div>
  );
}
