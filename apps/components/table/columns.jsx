"use client";

import { Checkbox } from "@/components/primitives/ui/checkbox";
import { propses, statuses, tagTypes } from "@/data/data";
import capitalizeFirstLetter from "@/utils/cap-first-letter";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Chọn tất cả"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Chọn"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Tác phẩm" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{capitalizeFirstLetter(row.getValue("title") ?? "")}
					</span>
				</div>
			);
		},
	},

	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Trạng thái" />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status"),
			);

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center">
					{status.icon && (
						<status.icon className="w-4 h-4 mr-2 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "props",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Thuộc tính" />
		),
		cell: ({ row }) => {
			const prop = propses.find((prop) => prop.value === row.getValue("props"));

			if (!prop) {
				return null;
			}
			return (
				<div className="flex items-center w-auto">
					{prop.icon && (
						<prop.icon className="w-4 h-4 mr-2 text-muted-foreground" />
					)}
					<span>{prop.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "tags",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="tag" />
		),
		enableSorting: false,
		cell: ({ row }) => {
			const tags = row.getValue("tags");

			if (!tags) {
				return null;
			}

			const tagCounts = tags.reduce((acc, tag) => {
				acc[tag.type] = (acc[tag.type] || 0) + 1;
				return acc;
			}, {});

			return (
				<div className="flex max-w-52">
					{Object.entries(tagCounts).map(([type, count]) => {
						const TagIcon = tagTypes.find((tag) => tag.value === type);
						return (
							<span key={type} className="flex items-center justify-center">
								<span>{count}</span>
								<TagIcon.icon className="w-4 h-4 mr-2 text-muted-foreground" />
							</span>
						);
					})}
				</div>
			);
		},

		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
