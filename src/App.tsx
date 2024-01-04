import Loading from "./components/loading";
import Pagination from "./components/pagination";
import { IRepoModal } from "./modal/IRepoModal";
import useInfo from "./customHooks/useInfo";
import Search from "./components/search";
import Radio from "./components/radio";
import "./styles/App.css";

const App: React.FC = () => {
  const {
    username,
    currentPage,
    totalPages,
    data,
    error,
    loading,
    isToggled,
    handlePageChange,
    handleSelectedRepoTypeChange,
    handleSubmit,
    setUsername,
  } = useInfo();

  return (
    <div className="main-container">
      {loading && <Loading />}
      <div className="search-container">
        <Search
          username={username}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
          isToggled={isToggled}
        >
          <Radio onSelectedRepoTypeChange={handleSelectedRepoTypeChange} />
        </Search>
        {error && <p className="error-message">{error}</p>}
      </div>
      {data.length > 0 && (
        <div className="app-container">
          <h2>GitHub Repositories</h2>
          <div className="data-container">
            {data.map((repo: IRepoModal) => (
              <div key={repo.id} className="repo-box">
                <h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h3>
                <p>Description: {repo.description}</p>
                <p>Stars: {repo.stargazers_count}</p>
                <p>Forks: {repo.forks_count}</p>
                <p>Primary Language: {repo.language}</p>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default App;
