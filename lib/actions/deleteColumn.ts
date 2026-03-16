"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import { Column, Board, JobApplication } from "../models";

export async function deleteColumn(id: string) {
    const session = await getSession();

    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    const column = await Column.findById(id);

    if (!column) {
        return { error: "Column not found" };
    }

    // Remove column reference from board
    await Board.findByIdAndUpdate(column.boardId, {
        $pull: { columns: id },
    });

    // Delete all job applications under this column
    await JobApplication.deleteMany({ columnId: id });

    // Delete the column itself
    await Column.deleteOne({ _id: id });

    // Revalidate dashboard
    revalidatePath("/dashboard");

    return { success: true };
}

