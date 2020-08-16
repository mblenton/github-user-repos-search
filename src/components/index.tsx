import React from "react";

export interface IGitHubUserData {
    user: {
        username: string;
        avatarUrl: string;
        url: string;
        email: string;
        repositories?: {
            nodes: [
                {
                    name: string;
                    description: string;
                    url: string;
                }
            ];
        };
    };
}
