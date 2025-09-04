import React from 'react'
import { createClient } from "@sanity/client";

export const client = createClient( {
    projectId: "rmef88ua",
    dataset: "production",
    apiVersion: "2025-09-03",
    useCdn: false,

});
