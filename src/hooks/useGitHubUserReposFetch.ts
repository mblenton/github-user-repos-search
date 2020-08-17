import {useEffect, useRef, useReducer} from "react";

const REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
const GITHUB_GRAPHQL_API_URL = process.env.GITHUB_GRAPHQL_API_URL;

export interface IGitHubUserData {
    user: {
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

type Status = "idle" | "fetching" | "fetched" | "error";

interface IState {
    status: Status;
    error?: string;
    gitHubUserData?: {
        data: IGitHubUserData;
    };
}

type Actions = "FETCHING" | "FETCHED" | "FETCH_ERROR";

interface IAction {
    type: Actions;
    payload?: IState["gitHubUserData"] | string;
}

export const useGitHubUserReposFetch = (username: string): IState => {
    const cache = useRef({});

    const initialState = {
        status: "idle" as Status,
        error: null,
        gitHubUserData: null as IState["gitHubUserData"]
    };

    const [state, dispatch] = useReducer((state: IState, action: IAction) => {
        switch (action.type) {
            case "FETCHING":
                return {...initialState, status: "fetching" as Status};
            case "FETCHED":
                return {
                    ...initialState,
                    status: "fetched" as Status,
                    gitHubUserData: action.payload as IState["gitHubUserData"]
                };
            case "FETCH_ERROR":
                return {...initialState, status: "error" as Status, error: action.payload};
            default:
                return state;
        }
    }, initialState);

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: "bearer " + REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `query { 
                user(login: "${username}") {
                  avatarUrl
                  url
                  email
                  repositories(first: 100) {
                    nodes {
                      name
                      description
                      url
                    }
                  }
                }
              }
          `
        })
    };

    useEffect(() => {
        let cancelRequest = false;
        if (!GITHUB_GRAPHQL_API_URL) return;

        const fetchData = async () => {
            if (username.length) {
                if (cache.current[username]) {
                    const data: IState["gitHubUserData"] = cache.current[username];
                    dispatch({type: "FETCHED", payload: data});
                } else {
                    try {
                        if (cancelRequest) return;
                        dispatch({type: "FETCHING"});
                        const response = await fetch(GITHUB_GRAPHQL_API_URL, requestOptions);
                        const data: IState["gitHubUserData"] = await response.json();
                        cache.current[username] = data;
                        dispatch({type: "FETCHED", payload: data});
                    } catch (error) {
                        if (cancelRequest) return;
                        dispatch({type: "FETCH_ERROR", payload: error.message});
                    }
                }
            }
        };

        fetchData();

        return function cleanup() {
            cancelRequest = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return state;
};
