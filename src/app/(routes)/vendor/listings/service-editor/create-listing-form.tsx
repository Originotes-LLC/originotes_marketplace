"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import React, { useRef } from "react";

/* eslint-disable tailwindcss/no-custom-classname */
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/index";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { ImageGrid } from "@/listings/service-editor/image-grid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ListingFileUpload } from "@/listings/service-editor/listing-file-upload";
import { ListingFormFooter } from "@/listings/service-editor/listing_form_footer";
import { ServiceListingSchema } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/shadcdn_utils";
import { submitNewService } from "@/vendor/actions";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useUploadImages } from "@/listings/service-editor/_hooks/useUploadImages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const initialState = {
  status: 200,
  code: "init",
  message: "",
  issues: {},
};

export const CreateListingForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [state, formAction] = useFormState(submitNewService, initialState);
  state?.code === "draft-saved" && console.log("Draft saved");


  const form = useForm<z.infer<typeof ServiceListingSchema>>({
    mode: "onChange",
    resolver: zodResolver(ServiceListingSchema),
    defaultValues: {
      service_name: "",
      service_description: "",
      service_category: "",
      service_price: "",
    },
  });

  const { isUploading, getRootProps, getInputProps, uploadedFiles } =
    useUploadImages(form);


  const handleFormData = (ref: React.RefObject<HTMLFormElement>) => {
    const formData = new FormData(ref.current!);
    formData.append("uploaded_service_files", JSON.stringify(uploadedFiles));
    return formData;
  };
  const formRef = useRef<HTMLFormElement>(null);
  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit((formData) => {
            return formAction(handleFormData(formRef));
          })(evt);
        }}
        className="relative space-y-10 divide-y divide-neutral-900/10"
      >
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="dark:text-background text-base font-semibold leading-7 text-neutral-900">
              Service Details
            </h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-200">
              Tell your customers about your service details. Be as creative as
              you want with the name and description.
            </p>
          </div>

          <div className="dark:bg-foreground rounded-xl shadow-sm ring-1 ring-neutral-900/5 md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  {/* Service NAME section */}
                  <FormField
                    name="service_name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label
                          className="dark:text-background"
                          htmlFor="service_name"
                        >
                          Name
                        </Label>
                        <FormControl>
                          <Input
                            id="service_name"
                            className={
                              errors.service_name
                                ? "dark:text-foreground bg-red-100 ring-2 ring-red-500 ring-offset-2"
                                : "dark:text-background"
                            }
                            type="text"
                            placeholder="e.g. proposal, magic elopement, date-night-in-i-box"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex items-center space-x-2">
                          {errors.service_name && (
                            <ExclamationCircleIcon className="size-7 text-red-500" />
                          )}
                          <FormMessage className="text-sm" />
                        </div>
                        <FormDescription className="dark:text-neutral-200">
                          This is the name of your service. Make it catchy and
                          descriptive.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Service DESCRIPTION Section */}
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="service_description"
                    render={({ field }) => (
                      <FormItem>
                        <Label
                          className="dark:text-background"
                          htmlFor="service_description"
                        >
                          Description
                        </Label>
                        <FormControl>
                          <Textarea
                            id="service_description"
                            className={
                              errors.service_description
                                ? "dark:text-foreground bg-red-100 ring-2 ring-red-500 ring-offset-2"
                                : "dark:text-background"
                            }
                            placeholder="Describe your service in detail."
                            {...field}
                          />
                        </FormControl>
                        <div className="flex items-center space-x-2">
                          {errors.service_description && (
                            <ExclamationCircleIcon className="size-7 text-red-500" />
                          )}
                          <FormMessage className="text-sm" />
                        </div>
                        <FormDescription className="dark:text-neutral-200">
                          Elaborate what your service will provide if users were
                          to purchase it. Buyers will only see the first few
                          lines unless they expand the description.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Service FILE Upload Section */}
                <div id="service_files" className="col-span-full">
                  <input
                    id="uploaded_service_files"
                    type="hidden"
                    {...form.register("uploaded_service_files")}
                    readOnly
                    value={JSON.stringify(uploadedFiles)}
                  />
                  {uploadedFiles && uploadedFiles.length > 0 ? (
                    <ImageGrid
                      isUploading={isUploading}
                      files={uploadedFiles}
                      uploadBtn={
                        {
                          rootProps: getRootProps,
                          inputProps: getInputProps,
                        }
                      }
                    />
                  ) : (
                    <ListingFileUpload
                      clientErrors={errors}
                      serverErrors={state?.issues}
                      getRootProps={getRootProps}
                      getInputProps={getInputProps}
                    />
                  )}

                </div>

                {/* Service CATEGORIES Section */}
                <FormField
                  control={form.control}
                  name="service_category"
                  render={({ field }) => (
                    <FormItem className="col-span-full flex flex-col">
                      <FormLabel className="dark:text-background">
                        Category
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                errors.service_category
                                  ? "w-[300px] md:w-[600px] justify-between dark:bg-transparent dark:text-white bg-red-100 ring-2 ring-red-500"
                                  : "w-[300px] md:w-[600px] justify-between dark:bg-transparent dark:text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <input
                                id="service_category"
                                type="hidden"
                                {...field}
                                name="service_category"
                              />
                              {field.value
                                ? categories.find(
                                  (category) => category.name === field.value
                                )?.name
                                : "Select a category"}
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
                                      form.trigger("service_category");
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
                      <div className="flex items-center space-x-2">
                        {errors.service_category && (
                          <ExclamationCircleIcon className="size-7 text-red-500" />
                        )}
                        <FormMessage className="text-sm" />
                      </div>
                      <FormDescription className="dark:text-neutral-200">
                        This is the category that users will use to find your
                        services.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* PRICING SECTION */}
        <div className="grid grid-cols-1 gap-8 pb-64 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="dark:text-background text-base font-semibold leading-7 text-neutral-900">
              Pricing & Inventory
            </h2>
            <p className="dark:text-background mt-1 text-sm leading-6 text-neutral-600">
              Set the price and availability of your service.
            </p>
          </div>

          <div className="dark:bg-foreground rounded-xl shadow-sm ring-1 ring-neutral-900/5 md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="relative max-w-2xl space-y-10">
                <FormField
                  control={form.control}
                  name="service_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-background">
                        Price
                      </FormLabel>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-neutral-500 sm:text-sm">$</span>
                        </div>
                        <FormControl>
                          <Input
                            id="service_price"
                            type="string"
                            className={
                              errors.service_price
                                ? "dark:text-foreground bg-red-100 pl-7 pr-12 ring-2 ring-red-500 ring-offset-2"
                                : "dark:text-background pl-7 pr-12"
                            }
                            placeholder="15023"
                            {...field}
                          />
                        </FormControl>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span
                            className="dark:text-background text-neutral-500 sm:text-sm"
                            id="price-currency"
                          >
                            USD
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {errors.service_price && (
                          <ExclamationCircleIcon className="size-7 text-red-500" />
                        )}
                        <FormMessage className="text-sm" />
                      </div>
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
          <ListingFormFooter
            clientErrors={errors}
            serverErrors={state?.issues}
          />
        </div>
      </form>
    </Form>
  );
};
