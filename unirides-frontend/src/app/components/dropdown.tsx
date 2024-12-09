/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";

export type LocationProp = {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

export default function Dropdown({
  onChange,
  type = "From",
  value,
  list,
}: Readonly<{
  value: string | null;
  onChange: (e: unknown) => void;
  type?: string;
  list?: unknown[];
}>) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        {value ? (
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {value}
          </MenuButton>
        ) : (
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {type}
          </MenuButton>
        )}
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {list?.map((location: any, i) => (
            <MenuItem key={i}>
              <div
                onClick={() => {
                  onChange(location.value);
                }}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                {location.label}
              </div>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
