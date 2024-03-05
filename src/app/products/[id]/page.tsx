"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TPosts } from "../../(home)/page";
import slugify from "@/context/slugify";

type Props = {
    params: {
        id: number;
    };
};

export default function page({ params: { id } }: Props) {
    const [post, setPost] = useState<TPosts>();

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/photos/${id}`
                );
                setPost((await response).data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts();
    }, []);

    return (
        <div >
                <span>{post?.id}</span>
                <p>{post?.title}</p>
                <img src={post?.url} alt="" />
        </div>
    );
}
