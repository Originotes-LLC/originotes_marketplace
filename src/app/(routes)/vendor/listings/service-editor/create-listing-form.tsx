"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceListingSchema } from "@/lib/schema";
import { ListingFormFooter } from "@/listings/service-editor/listing_form_footer";
import { cn } from "@/utils/shadcdn_utils";
import { submitNewService } from "@/vendor/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const categorys = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const;

/*

Fields needed to create a service

- Service name
- Type : Digital (hidden or set in the server action directly)
- Category (selected from a list of categories)
- Vendor  (set directly in the server action)
- Media (passing image Files)
- Standard Pricing (list price, sale price, currency)
- Options (list of options like add-ons of type toggle )
- Service Description (content)
*/

interface Category {
  name: string;
  active: boolean;
  sorting: null;
  images: null;
  description: string;
  meta_title: null;
  meta_description: null;
  parent_id: null;
  slug: string;
  top_id: null;
  date_created: string;
  id: string;
}




export const CreateListingForm = ({ categories }: { categories: Category[] }) => {
  const form = useForm<z.infer<typeof ServiceListingSchema>>({
    mode: 'onChange',
    resolver: zodResolver(ServiceListingSchema),
    defaultValues: {
      service_name: "",
      service_description: "",
      service_category: "",
      service_price: "",
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    const serverSideFormResponse = await submitNewService(data);
    return serverSideFormResponse
  })


  // const { errors } = form.formState;


  return (
    <Form {...form}>
      <form
        action={action}
        // onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-10 divide-y divide-neutral-900/10"
      >
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-neutral-900 dark:text-background">
              Service Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-200">
              Tell your customers about your service details. Be as creative as
              you want with the name and description.
            </p>
          </div>

          <div className="rounded-xl shadow-sm ring-1 ring-neutral-900/5 dark:bg-foreground md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <FormField
                    name="service_name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="dark:text-background" htmlFor="service_name">Name</Label>
                        <FormControl>
                          <Input
                            className="dark:text-background"
                            type="text"
                            id="service_name"
                            placeholder="e.g. proposal, magic elopement, date-night-in-i-box"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="dark:text-neutral-200">
                          This is the name of your service. Make it catchy and
                          descriptive.
                        </FormDescription>
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="service_description"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="dark:text-background" htmlFor="service_description">Description</Label>
                        <FormControl>
                          <Textarea
                            className="dark:text-background"
                            placeholder="Describe your service in detail."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="dark:text-neutral-200">
                          Elaborate what your service will provide if users were
                          to purchase it. Buyers will only see the first few
                          lines unless they expand the description.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                {/* CATEGORIES */}
                <FormField
                  control={form.control}
                  name="service_category"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex flex-col">
                      <FormLabel className="dark:text-background">Category</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] md:w-[600px] justify-between dark:bg-transparent dark:text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories.find(
                                  (category) => category.name === field.value
                                )?.name
                                : "Select category"}
                              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 md:w-[600px]">
                          <Command>
                            <CommandInput
                              placeholder="Search a category..."
                              className="h-9"
                            />
                            <CommandEmpty>No categories found.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {categories.map((category) => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                      form.setValue(
                                        "service_category",
                                        category.name
                                      );
                                    }}
                                  >
                                    {category.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        category.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                      <FormDescription className="dark:text-neutral-200">
                        This is the category that will be used in the dashboard.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Photos uploader will go here below */}
              </div>
            </div>
          </div>
        </div>

        {/* PRICING SECTION */}
        <div className="grid grid-cols-1 gap-8 pb-64 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-neutral-900 dark:text-background">
              Pricing & Inventory
            </h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-background">
              Set the price and availability of your service.
            </p>
          </div>

          <div className="rounded-xl shadow-sm ring-1 ring-neutral-900/5 dark:bg-foreground md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="relative max-w-2xl space-y-10">
                <FormField
                  control={form.control}
                  name="service_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-background">Price</FormLabel>
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-neutral-500 sm:text-sm">$</span>
                      </div>
                      <FormControl>
                        <Input
                          type="string"
                          className="pl-7 pr-12 dark:text-background"
                          placeholder="15023"
                          {...field}
                        />
                      </FormControl>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span
                          className="text-neutral-500 dark:text-background sm:text-sm"
                          id="price-currency"
                        >
                          USD
                        </span>
                      </div>
                      <FormMessage />
                      <FormDescription className="dark:text-background">
                        Set the price for your service. This will be the
                        standard price that buyers will see.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0">
          <ListingFormFooter />
        </div>
      </form>
    </Form>
  );
};
