import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import Link from "next/link";
import Image from "next/legacy/image";
import AgendaItemsList from "../molecules/AgendaItemsList";
import SectionTitle from "../ui/SectionTitle";
import Button from "../Standard/Button";

type AgendaItemsProps = {
  agendaItems: AgendaItem[];
  isHomeComponent: boolean;
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

export default async function AgendaItems(props: AgendaItemsProps) {
  const agendaItems = (await fetchEntries({
    model: "agenda-item",
    // If its the home component, only show the first item
    limit: props.isHomeComponent ? 3 : 100,
    apiKey,
    fields: "data.title,data.date,data.shortText,data.url,id,data.mainImage",
  })) as AgendaItem[];

  if (!agendaItems) {
    return null;
  }

  return (
    <>
      {props.isHomeComponent && (
        <SectionTitle title={props.title} className="" />
      )}
      <div className="grid grid-cols-1 gap-4">
        <AgendaItemsList
          agendaItems={agendaItems}
          isHomeComponent={props.isHomeComponent}
        />
      </div>
      <div className="w-full flex items-center justify-center pt-4">
        <Button text="Alles bekijken" url="/agenda" />
      </div>
    </>
  );
}
