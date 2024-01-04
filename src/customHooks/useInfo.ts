import { useCallback, useEffect, useState } from "react";
import { IRepoModal } from "../modal/IRepoModal";
import { get } from "../apiLibrary/apiLibrary";
import { IUserModal } from "../modal/IUserModal";
import { REPO_TYPES } from "../constants/repositoryType";
import useToggle from "./useToggle";

const useInfo = () => {
  type RepoType = (typeof REPO_TYPES)[keyof typeof REPO_TYPES];

  const [username, setUsername] = useState("");
  const [selectedRepoType, setSelectedRepoType] = useState<RepoType>(
    REPO_TYPES.PRIVATE
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<IRepoModal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState<IUserModal | null>(
    null
  );
  const [isToggled, toggle] = useToggle(true);

  useEffect(() => {
    const getTotal = async () => {
      try {
        setLoading(true);
        // If user exists then fetch count record..
        if (userProfileData) {
          const totalCount = await getTotalReposCount(username);
          setTotalPages(Math.ceil(totalCount / 10)); // Assuming 10 items per page
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    };
    getTotal();
  }, [userProfileData]);

  const resetData = () => {
    setData([]);
    setUserProfileData(null);
  };

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      const newData = await getRepoList(username, page);
      setData(newData);
      setCurrentPage(page);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalReposCount = async (username: string) => {
    try {
      setLoading(true);
      const response = await get<number>("/getTotalReposCount", {
        username,
        selectedRepoType,
      });
      return response;
    } catch (error) {
      handleApiError(error);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  const getRepoList = async (username: string, page: number) => {
    try {
      setLoading(true);
      const response = await get<IRepoModal[]>("/repositories", {
        username,
        page,
        selectedRepoType,
      });
      return response;
    } catch (error) {
      handleApiError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await get<IUserModal>("/profile", {
        username,
        selectedRepoType,
      });
      setUserProfileData(response);
      return response;
    } catch (error) {
      handleApiError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: any) => {
    console.error("API Error:", error);
    const { response }: any = error;
    setError(response?.data?.error || "An error occurred");
    resetData();
  };

  const handleSelectedRepoTypeChange = (repoType: RepoType) => {
    setSelectedRepoType(repoType);
    toggle();
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setError(null); // Clear previous errors

      if (!username && !isToggled) {
        setError("Please fill the input field");
        return;
      }

      try {
        const userData = await getUserProfile();

        if (!userData) {
          return; // No need to proceed if user data is not available
        }

        const newData = await getRepoList(username, currentPage);

        if (newData.length === 0) {
          setError("User does not have any repository(s)");
          resetData();
          return;
        }

        setData(newData);
      } catch (error) {
        handleApiError(error);
      }
    },
    [username, currentPage, getUserProfile, getRepoList]
  );

  return {
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
  };
};

export default useInfo;
