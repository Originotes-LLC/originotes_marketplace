"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
/* eslint-disable tailwindcss/no-custom-classname */
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SearchBoxSuggestion, SearchBoxSuggestionResponse } from "@mapbox/search-js-core";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ServiceListingSchema } from "@/lib/schema";
import type { UseFormReturn } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/shadcdn_utils";
import { searchLocation as search } from "@/vendor/actions";
import { useDebounce } from "@uidotdev/usehooks";
import { z } from "zod";

export function LocationInput({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ServiceListingSchema>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const value = "";
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [locations, setLocations] = useState<SearchBoxSuggestionResponse | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<
    SearchBoxSuggestion[] | []
  >([]);

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setLocations(null);
    }
  }, [open]);


  useEffect(() => {
    if (selectedLocations.length) {
      form.setValue("service_location", JSON.stringify(selectedLocations));
    }
  }, [selectedLocations, form]);

  useEffect(() => {
    const searchLocation = async (str: string) => {
      try {
        setIsSearching(true);
        const response = await search(str);
        if (response) {
          setLocations(response);
          setIsSearching(false);
        }
      } catch (error) {
        setIsSearching(false);
      }
    };
    if (searchTerm.length) {
      searchLocation(debouncedSearchTerm);
    } else {
      setLocations(null);
    }
  }, [searchTerm, debouncedSearchTerm]);

  return (
    <div>
      <input
        id="service_location"
        type="hidden"
        {...form.register("service_location", {
          required: true,
          value: JSON.stringify(selectedLocations),
        })}
      />
      <div className="col-span-full flex flex-col">
        <Label className="dark:text-background mb-3">Location</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="text-muted-foreground w-[300px] justify-between md:w-[600px] dark:bg-transparent dark:text-white"
            >
              {value
                ? locations?.suggestions.find((location) => location.name === value)?.name
                : "Search by city or zipcode..."}
              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 md:w-[600px]">
            <Command shouldFilter={false}>
              <CommandInput
                onValueChange={(value) => setSearchTerm(value.trim())}
                placeholder="e.g. Miami, San Francisco, Greenville, 33015..."
                className="h-9"
              />
              <CommandEmpty>
                {isSearching && searchTerm && `Searching...`}
                {!locations?.suggestions.length &&
                  !searchTerm &&
                  !isSearching &&
                  `Start typing to search for a location...`}
                {!locations?.suggestions.length &&
                  !isSearching &&
                  debouncedSearchTerm &&
                  searchTerm &&
                  `No results found for "${searchTerm}"`}
              </CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {locations?.suggestions.map((location) => (
                    <CommandItem
                      value={location.name}
                      key={location.mapbox_id}
                      onSelect={() => {
                        setSelectedLocations([...selectedLocations, location]);
                        setOpen(false);
                      }}
                    >
                      {`${location.name}, ${location.place_formatted}`}
                      <CheckIcon
                        className={cn(
                          "ml-auto size-4",
                          value === location.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-muted-foreground dark:text-background mt-3 text-[0.8rem]">
          Your service can have multiple cities within the same county or
          different counties in your state.
        </p>
        {/* server or client errors will go here */}
        <div className="mt-4 flex flex-wrap items-center justify-start space-x-3">
          {selectedLocations.map((location) => (
            <span key={location.mapbox_id} className="pb-3">
              <Badge variant="outline" className="dark:text-white">
                {`${location.name}, ${location?.context?.region?.name}`}{" "}
                <XMarkIcon className="ml-1 size-4 font-semibold text-neutral-900 dark:text-white" />
              </Badge>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
