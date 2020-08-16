import React, {useState} from "react";
import {IGitHubUserData} from "../index";
import "./gitHubUserRepos.css";

type Sorted = "asc" | "desc" | "notsorted";

interface IProps {
    userDataRepos: IGitHubUserData["user"]["repositories"]["nodes"];
}

export const GitHubUserRepos = ({userDataRepos}: IProps): JSX.Element => {
    const [sorted, setSorted] = useState<Sorted>("notsorted");
    const toggleSort = () => {
        if (sorted === "asc") {
            userDataRepos.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setSorted("desc");
        } else {
            userDataRepos.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            setSorted("asc");
        }
    };
    return (
        <div className="container">
            <div className="table">
                <div className="table__head">
                    <div className="th">
                        <div onClick={toggleSort} className="td sort">
                            Repository Name
                        </div>
                        <div className="td">Description</div>
                        <div className="td">Link</div>
                    </div>
                </div>
                <div className="table__rows">
                    {userDataRepos.length &&
                        userDataRepos.map((repo, i) => {
                            return (
                                <div key={i} className="tr">
                                    <div className="td">{repo.name}</div>
                                    <div className="td">{repo.description}</div>
                                    <div className="td">
                                        <a href={repo.url}>{repo.url}</a>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
