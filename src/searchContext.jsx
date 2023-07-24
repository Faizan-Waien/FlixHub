import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext()

const value = () => {

    const [searchText, setSearchText] = useState("")

    const [content, setContent] = useState([])

    const navigate = useNavigate()

    return { content, setContent, navigate, searchText, setSearchText }
}

const SearchProvider = ({children}) => {
    return (
        <SearchContext.Provider value={value()}>{children}</SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext)

export {
    useSearch,
    SearchProvider
}