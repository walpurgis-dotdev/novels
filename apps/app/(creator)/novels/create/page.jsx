"use client";

import CreateNovelForm from "@/components/forms/create-novel-form";
import { Shell } from "@/components/wrappers/shell-variants";
import * as React from "react";

export default function Page() {
	return (
		<Shell as="div" variant="centered">
			<div className="w-full max-w-xl p-8 mx-auto bg-white border rounded-md shadow-md dark:bg-neutral-800 dark:border-neutral-700 ">
				<CreateNovelForm />
			</div>
		</Shell>
	);
}
