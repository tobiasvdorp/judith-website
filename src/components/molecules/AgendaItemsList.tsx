"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { AgendaItem } from "@/components/organisms/AgendaItems";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Input from "@/components/Standard/Input";
import {
  MdOutlineContentPasteSearch,
  MdOutlineSearchOff,
} from "react-icons/md";
import Title from "../Standard/Title";

type AgendaItemsProps = {
  agendaItems: AgendaItem[];
  isHomeComponent: boolean;
  // title: string;
};
export default function AgendaItemsList(agendaItems: AgendaItemsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(agendaItems.agendaItems);

  // When the search term changes, set the results
  useEffect(() => {
    const filteredResults = agendaItems.agendaItems.filter((item) => {
      return (
        item.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.data.shortText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setResults(filteredResults);
  }, [agendaItems.agendaItems, searchTerm]);

  return (
    <>
      {agendaItems.isHomeComponent ? null : (
        <Input
          placeholder=" "
          type="text"
          id="search"
          label="Activiteit zoeken"
          onChange={(e) => setSearchTerm(e.target.value)}
          inputClassName="pl-7"
          labelClassName="peer-placeholder-shown:left-6"
        >
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-2 z-20" />
          {searchTerm.length !== 0 && results.length !== 0 && (
            <p className="absolute">
              {results.length} resultaten voor &quot;{searchTerm}&quot;
            </p>
          )}
        </Input>
      )}
      <div className="w-screen"></div>
      {/* If there are no results for the searchterm, show "Geen resultaten"*/}
      {searchTerm.length !== 0 && results.length === 0 ? (
        <p className="text-center w-full flex flex-col items-center justify-center gap-2">
          <MdOutlineSearchOff className="text-5xl" /> Geen resultaten gevonden
          voor &quot;{searchTerm}&quot;
        </p>
      ) : // If there are no results and the searchterm is empty, show "Geen items"
      searchTerm.length === 0 && results.length === 0 ? (
        <p className="text-center w-full flex flex-col items-center justify-center gap-2">
          <MdOutlineContentPasteSearch className="text-5xl " /> Er zijn nog geen
          activiteiten gepland.
        </p>
      ) : null}

      {/* FIlters */}
      {results.map((item) => (
        <Link
          key={item.id}
          href={`/agenda/${item.data.url}`}
          className="border-2 border-neutral-dark bg-neutral-light shadow-md flex rounded-lg p-4 gap-3 group card hover:bg-neutral-dark duration-100"
        >
          {/* Image container */}
          <div className="relative w-32 h-28 rounded-md overflow-hidden bg-primary-dark z-0">
            <div className="absolute z-10 text-white text-center text-3xl font-rodetta flex items-center justify-center w-full h-full ">
              <p className="drop-shadow-[0_2px_2px_rgba(0,0,0)]">
                {item.formattedDay}
                <br></br>
                {item.formattedMonth}
              </p>
            </div>
            <Image
              src={item.data.mainImage}
              alt="Activiteit"
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-30 duration-100 opacity-80 blur-[1px]"
              sizes="100px"
            />
          </div>
          <div className="w-full">
            <Title
              className="font-rodetta text-xl"
              text={item.data.title}
              order={agendaItems.isHomeComponent ? 3 : 2}
            ></Title>
            <p className="">{item.data.shortText}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
