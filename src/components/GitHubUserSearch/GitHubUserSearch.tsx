import React, {useState, ChangeEvent, FormEvent} from "react";
import "./gitHubUserSearch.css";

interface IProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const GitHubUserSearch = ({setUsername}: IProps): JSX.Element => {
    const [query, setQuery] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(query);
    };

    return (
        <div className="search">
            <form className="Form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    autoFocus
                    autoComplete="off"
                    name="search"
                    onChange={handleChange}
                    placeholder="Search GitHub User Repos"
                />
                <button> Search </button>
            </form>
        </div>
    );
};
