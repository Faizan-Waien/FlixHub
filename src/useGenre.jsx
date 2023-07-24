const useGenre = (selectedGenre) => {
    if (selectedGenre.length < 1) return "";

    const GenreID = selectedGenre.map((g) => g.id)
    return GenreID.reduce((acc, curr) => acc + "," + curr)
    
}
export default useGenre