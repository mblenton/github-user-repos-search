import React, {useState} from "react";
import {useGitHubUserReposFetch} from "../hooks/useGitHubUserReposFetch";
import {GitHubUserRepos} from "./GitHubUserRepos/GitHubUserRepos";
import {GitHubUserProfile} from "./GitHubUserProfile/GitHubUserProfile";
import {GitHubUserSearch} from "./GitHubUserSearch/GitHubUserSearch";

import "./index.css";

export const GitHubUserReposSearch = (): JSX.Element => {
    const [username, setUsername] = useState("");

    const {status, gitHubUserData, error} = useGitHubUserReposFetch(username);

    const isUserFound =
        gitHubUserData &&
        gitHubUserData.data &&
        gitHubUserData.data.user &&
        gitHubUserData.data.user.url;
    const userHasRepos =
        isUserFound &&
        gitHubUserData.data.user.repositories &&
        gitHubUserData.data.user.repositories.nodes &&
        gitHubUserData.data.user.repositories.nodes.length;

    return (
        <div>
            <div>
                <header> GitHub User Repos Search </header>
                <GitHubUserSearch setUsername={setUsername} />
                <main>
                    {status === "error" && (
                        <div className="horizontalyCenteredWrapper">
                            <div>Error: {error}</div>
                        </div>
                    )}
                    {status === "fetching" && (
                        <div className="horizontalyCenteredWrapper">
                            <div className="loading" />
                        </div>
                    )}
                    {status === "fetched" && (
                        <>
                            {!isUserFound && (
                                <div className="horizontalyCenteredWrapper">
                                    <div>No user found!</div>
                                </div>
                            )}
                            {isUserFound && (
                                <GitHubUserProfile
                                    username={username}
                                    userDataProfile={gitHubUserData.data.user}
                                />
                            )}
                            {userHasRepos && (
                                <GitHubUserRepos
                                    userDataRepos={gitHubUserData.data.user.repositories.nodes}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};
