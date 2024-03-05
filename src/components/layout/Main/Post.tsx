import { TPosts } from "@/app/(home)/page";
import slugify from "@/context/slugify";
import Link from "next/link";
import React from "react";

type Props = {
    item: TPosts;
};

export default function Post({ item }: Props) {
    return (
        <Link href={`/products/${item.id}`}>
        {/* <Link href={`/products/${item.id}/${slugify({ str: item.title })}`}> */}
            <div className="flex flex-col justify-center items-center gap-4 p-4 bg-slate-400 w-[350px] h-[300px] rounded-sm">
                {item.id}
                <img src={item.thumbnailUrl} alt="Picture of the author" />
                <h1 className="text-center">{item.title}</h1>
            </div>
        </Link>
    );
}
