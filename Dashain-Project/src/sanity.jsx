import React from 'react'
import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient( {
    projectId: "rmef88ua",
    dataset: "production",
    apiVersion: "2023-01-01",
    useCdn: false,

});

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)