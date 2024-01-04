import { useState } from "react";
import { REPO_TYPES } from "../constants/repositoryType";

const Radio = ({ onSelectedRepoTypeChange }: any) => {
  type RepoType = (typeof REPO_TYPES)[keyof typeof REPO_TYPES];
  const [repoType, setRepoType] = useState<RepoType>(REPO_TYPES.PRIVATE);

  const handleRepoTypeChange = (e: any) => {
    const selectedRepoType = e.target.value;
    setRepoType(selectedRepoType);
    onSelectedRepoTypeChange(selectedRepoType); // Notify the parent component
  };

  return (
    <>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="public-repo"
          name="repoType"
          value={REPO_TYPES.PUBLIC}
          checked={repoType === REPO_TYPES.PUBLIC}
          onChange={handleRepoTypeChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="public-repo"
          className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
        >
          Public Repository
        </label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="private-repo"
          name="repoType"
          value={REPO_TYPES.PRIVATE}
          checked={repoType === REPO_TYPES.PRIVATE}
          onChange={handleRepoTypeChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="private-repo"
          className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
        >
          Own Repository
        </label>
      </div>
    </>
  );
};

export default Radio;
