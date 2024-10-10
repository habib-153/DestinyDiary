"use client";

import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";

import { IUser } from "@/src/types";
import { useGetAllUsers } from "@/src/hooks/user.hook";

const PaymentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  //   const apiUrl2 = `${envConfig.baseApi}/posts?page=${currentPage}&limit=${dataPerPage}`;
  //     const {
  //       data: postData,
  //       isLoading: postLoading,
  //     } = useGetAllPosts(apiUrl2);

  const { data } = useGetAllUsers(
    `status=PREMIUM&role=USER&page=${currentPage}&limit=${dataPerPage}`
  );

  const users = data?.data // users Array

  const totalPagesArray = Array.from(
    { length: data?.meta?.totalPage || 0 },
    (_, i) => i + 1
  );

  const totalPages = totalPagesArray.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "TRANID", uid: "transactionId" },
    { name: "START DATE", uid: "startDate" },
    { name: "END DATE", uid: "endDate" },
    { name: "CHARGE", uid: "charge" },
    { name: "PAYMENT STATUS", uid: "paymentStatus" },
  ];

  const renderCell = useCallback((user: IUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profilePhoto }}
            className=" text-xl"
            name={cellValue as string}
          >
            <span className="text-lg">{user.name}</span>
          </User>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-sm">{cellValue as string}</p>
          </div>
        );
      case "transactionId":
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            <span className="">{user?.transactionId}</span>
          </Chip>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className=" text-sm capitalize">
            {new Date(user?.premiumStart as string).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </p>
          </div>
        );
      case "endDate":
        return (
          <div className="flex flex-col">
            <p className=" text-sm capitalize">
            {new Date(user?.premiumEnd as string).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </p>
          </div>
        );
      case "charge":
        return (
          <div className="flex flex-col">
            <p className=" text-sm capitalize ml-2">
              $ {user?.premiumCharge}
            </p>
          </div>
        );
      case "paymentStatus":
        return (
          <Chip
            className="capitalize"
            color={"success"}
            size="sm"
            variant="flat"
          >
            <span className="">{user?.paymentStatus}</span>
          </Chip>
        );

      default:
        return <span>{String(cellValue)}</span>;
    }
  }, []);

  return (
    <div className="my-10 lg:my-5">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">All Payments</h1>
      </div>
      <div className="">
        <div className="overflow-x-auto">
          {users?.length > 0 ? (
            <Table
              aria-label="Users table with custom cells"
              className="min-w-full"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item: IUser) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Table aria-label="Example empty table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
          )}
        </div>
      </div>

      <div>
        {users?.length > 0 && (
          <div className="flex justify-center items-center mt-8">
            <Pagination
              showControls
              initialPage={1}
              page={currentPage}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
