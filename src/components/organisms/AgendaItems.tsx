import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import Link from "next/link";
import Image from "next/legacy/image";
import AgendaItemsList from "../molecules/AgendaItemsList";

type AgendaItemsProps = {
  agendaItems: AgendaItem[];
  homePageVersion: boolean;
  title: string;
};

export type AgendaItem = {
  id: string;
  data: {
    title: string;
    date: string;
    shortText: string;
    url: string;
    mainImage: string;
  };
};

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

export default async function AgendaItems() {
  const agendaItems = (await fetchEntries({
    model: "agenda-item",
    limit: 10,
    apiKey,
    fields: "data.title,data.date,data.shortText,data.url,id,data.mainImage",
  })) as AgendaItem[];

  if (!agendaItems) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <AgendaItemsList agendaItems={agendaItems} />
      </div>
    </>
  );
}
