"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";



const SignOutButton = () => {
    const router = useRouter();
    return (
        <DropdownMenuItem
            className="hover:text-primary hover:bg-primary/15"
            onClick={async () => {
                const result = await signOut();
                if (result.data) {
                    router.push("/sign-in")
                } else {
                    alert("Error signing out");
                }
                }}
        >
            Log out
        </DropdownMenuItem>
    )
}

export default SignOutButton