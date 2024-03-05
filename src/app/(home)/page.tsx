"use client";
import Post from "@/components/layout/Main/Post";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export type TPosts = {
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export default function Products() {
    const [post, setPost] = useState<TPosts[]>([]);
    const photos = 5000;
    const [count, setCount] = useState<number>(10);
    const searchParams = useSearchParams();
    console.log(searchParams);

    const [currentPage, setCurrentPage] = useState<number>(
        Number(searchParams.get("page")) ?? 1
    );

    useEffect(() => {
        async function getPosts() {
            try {
                // const response = axios.get(
                //     `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=${count}`
                // );
                const response = axios.get(
                    `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${count}`
                );
                setPost((await response).data);
                console.log(post);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts();
    }, [count]);

    function range(start: number, stop: number, step: number = 1) {
        let result = [];

        for (let i = start; i <= stop; i += step) {
            result.push(i);
        }

        return result;
    }

    function getPageRange(currentPage: number) {
        if (currentPage <= 1) {
            return range(1, 3);
        } else if (currentPage === photos / count) {
            return range(photos / count - 2, photos / count - 1);
        } else {
            return range(currentPage - 1, currentPage + 1);
        }
    }

    return (
        <main className="flex flex-col gap-8">
            <div className="Products flex justify-around flex-wrap gap-[26px] m-5">
                {post.map((item) => (
                    <Post item={item} />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`?page=${
                                currentPage <= 1 ? 1 : currentPage - 1
                            }`}
                        />
                    </PaginationItem>
                    {currentPage - 1 > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    href={`?page=1`}
                                    isActive={1 === currentPage}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        </>
                    )}
                    {getPageRange(currentPage).map((item) => (
                        <PaginationItem key={item}>
                            <PaginationLink
                                href={`?page=${item}`}
                                isActive={item === currentPage}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {currentPage !== photos / count &&
                        currentPage !== photos / count - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    {currentPage !== photos / count - 1 && (
                        <PaginationItem>
                            <PaginationLink
                                href={`?page=${photos / count}`}
                                isActive={photos / count === currentPage}
                            >
                                {photos / count}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext href={`?page=${currentPage + 1}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <Button
                className="w-[400px] m-auto"
                variant={"outline"}
                onClick={() => setCount((count) => count + 5)}
            >
                Learn More 5
            </Button>
        </main>
    );
    ``;
}
