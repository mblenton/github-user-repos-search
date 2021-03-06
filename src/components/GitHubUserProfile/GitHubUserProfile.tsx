import React from "react";
import {IGitHubUserData} from "../../hooks/useGitHubUserReposFetch";
import "./gitHubUserProfile.css";

interface IProps {
    username: string;
    userDataProfile: IGitHubUserData["user"];
}

export const GitHubUserProfile = ({username, userDataProfile}: IProps): JSX.Element => {
    const {avatarUrl, email, url} = userDataProfile;
    return (
        <div className="user-profile">
            <img id="avatar" src={avatarUrl} />
            <div id="username">{username}</div>
            <div className="description">
                <div>
                    Email: <span id="email">{email}</span>
                </div>
                <div>
                    GitHub:{" "}
                    <a href={url}>
                        <span id="url">{url}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
