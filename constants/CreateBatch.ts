import { CircleIcon } from "lucide-react";

export const createBatchConstants = [
  {
    label: "Class name (required)",
    name: "name",
    type: "text",
    required: true,
  },
  {
    label: "Section",
    name: "section",
    type: "text",
  },
  {
    label: "Subject",
    name: "subject",
    type: "text",
  },
  {
    label: "Room",
    name: "room",
    type: "text",
  },
];

export const createBatchStyles = {
  label:
    "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
  input:
    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
};

export const students = [
  {
    id: "0",
    name: "Aasil",
  },
  {
    id: "1",
    name: "Zaki",
  },
  {
    id: "2",
    name: "Yahya",
  },
  {
    id: "3",
    name: "Taha",
  },
  {
    id: "4",
    name: "Talha",
  },
];
