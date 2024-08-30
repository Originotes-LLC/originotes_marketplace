import { CheckIcon, ChevronUpDownIcon, } from "@heroicons/react/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";

import { Badge } from "@/components/ui/badge";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
  { id: 6, name: "Bettie Skiles" },
  { id: 7, name: "Tavares Stokes" },
  { id: 8, name: "Maude Thiel" },
  { id: 9, name: "Eino Nami" },
  { id: 10, name: "Ferne Littel" },
  { id: 11, name: "Ashley Thiel" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Location2 = () => {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <Combobox
      multiple
      as="div"
      value={selectedPeople}
      onChange={setSelectedPeople}
      onClose={() => setQuery("")}
    >
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        Location
      </Label>
      <div className="relative mt-2">
        <ComboboxInput
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
        // displayValue={() => {
        //   return (<span>{selectedPeople.map((person) => person.name)}</span>);
        // }}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="size-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        {filteredPeople.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.name}
                value={person}
                className={({ focus }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    focus ? "bg-fuchsia-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ focus, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {person.name}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          focus ? "text-fuchsia-200" : "text-gray-500",
                        )}
                      >
                        {person.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          focus ? "text-white" : "text-fuchsia-600",
                        )}
                      >
                        <CheckIcon className="size-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-start space-x-3">
        {selectedPeople.map((person) => (
          <span key={person.id} className="pb-3">
            <Badge variant="outline">
              {person.name} <XMarkIcon className="ml-1 size-4 font-semibold text-neutral-900" />
            </Badge>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute right-0 top-1 block size-4 -translate-y-1/2 translate-x-1/2 text-neutral-500">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
            </svg> */}
          </span>
        ))}
      </div>
    </Combobox>
  );
};




