import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import AgendaItemsList from "@/components/molecules/AgendaItemsList";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/Standard/Button";

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
  formattedDay: string;
  formattedMonth: string;
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

  function formatDay(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("nl-NL", { day: "numeric" });
  }

  function formatMonth(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("nl-NL", { month: "short" });
  }

  const formattedAgendaItems = agendaItems.map((item) => {
    const formattedDay = formatDay(item.data.date);
    const formattedMonth = formatMonth(item.data.date);
    return {
      ...item,
      formattedDay,
      formattedMonth,
    };
  });
  return (
    <>
      <div className="">
        {props.isHomeComponent && (
          <SectionTitle title={props.title} className="" />
        )}
        <div className="grid grid-cols-1 gap-4 ">
          <AgendaItemsList
            agendaItems={formattedAgendaItems}
            isHomeComponent={props.isHomeComponent}
          />
        </div>
        {props.isHomeComponent && (
          <div className="w-full flex items-center justify-center pt-4">
            <Button text="Alles bekijken" url="/agenda" />
          </div>
        )}
      </div>
    </>
  );
}
