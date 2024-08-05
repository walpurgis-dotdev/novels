import { AddressBar } from "@/components/admin/address-bar";
import { UserClient } from "@/components/admin/tables/user-tables/user-client";

const users = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
  {
    id: 11,
    name: "Sophia Brown",
    company: "TechSolutions",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 12,
    name: "William Johnson",
    company: "SoftTech",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 13,
    name: "Zoe Wilson",
    company: "WebWorks",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
];

const addressBarItems = [{ title: "User", link: "/dashboard/user" }];

export default function User() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <AddressBar items={addressBarItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
