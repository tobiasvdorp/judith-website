"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { AgendaItem } from "../organisms/AgendaItems";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

type AgendaItemsProps = {
  agendaItems: AgendaItem[];
  // homePageVersion: boolean;
  // title: string;
};
export default function AgendaItemsList(agendaItems: AgendaItemsProps) {
  function formatDay(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("nl-NL", { day: "numeric" });
  }

  function formatMonth(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("nl-NL", { month: "short" });
  }

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
      <div className="relative z-0">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block py-2.5 px-0 pl-5 w-full text-sm  bg-transparent border-0 rounded-sm border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-primary-dark peer "
          placeholder=" "
          type="text"
          id="search"
        ></input>
        <label
          htmlFor="search"
          className="absolute text-md  duration-300 transform -translate-y-6 peer-focus:font-bold top-2.5 -z-10 left-0 origin-[0] peer-focus:start-0 peer-focus:gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:left-6 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Activiteit zoeken
        </label>
        <FaSearch className="absolute top-1/2 -translate-y-1/2" />
      </div>

      {/* FIlters */}
      {results.map((item) => (
        <Link
          key={item.id}
          href={`/agenda/${item.data.url}`}
          className="border-2 border-neutral-dark bg-neutral shadow-md flex rounded-lg p-4 gap-3 group card hover:bg-neutral-dark duration-100"
        >
          {/* Image container */}
          <div className="relative w-32 h-28 rounded-md overflow-hidden bg-primary-dark z-0">
            <div className="absolute z-10 text-white text-center text-3xl font-rodetta flex items-center justify-center w-full h-full ">
              <p className="drop-shadow-[0_2px_2px_rgba(0,0,0)]">
                {formatDay(item.data.date)}
                <br></br>
                {formatMonth(item.data.date)}
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
            <h2 className="font-rodetta">{item.data.title}</h2>
            <p className="">{item.data.shortText}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
