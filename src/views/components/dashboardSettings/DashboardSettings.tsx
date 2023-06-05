import { useState, useContext } from "react";
import { UserAccessTokenContext } from "../../../context/UserAccessTokenContext";
import { UserReposDataContext } from "../../../context/UserReposDataContext";
import { UserDetailsContext } from "../../../context/UserDetailsContext";
import { SearchUserReposContext } from "../../../context/SearchUserReposContext";
import { getUserGithubRepos } from "../../../api/siteApiCalls";
import nFormatter from "../../../utils/nFormatter";
import { BsTriangleFill } from 'react-icons/bs'
import './dashboardSettings.scss'

const DashboardSettings = () => {
  const { accessToken } = useContext(UserAccessTokenContext)
  const { userRepos, setUserRepos, setIsLoading } = useContext(UserReposDataContext)
  const { userDetails } = useContext(UserDetailsContext)
  const { keyword } = useContext(SearchUserReposContext)
  const { login, repositories } = userDetails
  const [direction, setDirection] = useState("ASC")
  const [current, setCurrent] = useState("CREATED_AT")

  const sortRepos = async (field: string) => {
    /** Creating request of user sorting demand */
    setIsLoading(true)
    const fetchRepos = await getUserGithubRepos(accessToken, login, repositories.totalCount, field, direction);
    setCurrent(field)
    setUserRepos(fetchRepos)
    setIsLoading(false)
  }

  const handleNameSort = () => {

    /** Checking is user wants to change direction or sorting type */
    if (current !== "NAME") {
      setDirection("ASC")
      sortRepos("NAME")
      return;
    }

    // Changing direction depending on current state
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("NAME")
    }

    // Changing direction depending on current state
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("NAME")
    }
  }

  const handleCreatedAt = () => {

    /** Checking is user wants to change direction or sorting type */
    if (current !== "CREATED_AT") {
      setDirection("ASC")
      sortRepos("CREATED_AT")
      return;
    }

    // Changing direction depending on current state
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("CREATED_AT")
    }

    // Changing direction depending on current state
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("CREATED_AT")
    }
  }

  const handleModifiedSort = () => {

    /** Checking is user wants to change direction or sorting type */
    if (current !== "UPDATED_AT") {
      setDirection("ASC")
      sortRepos("UPDATED_AT")
      return;
    }

    // Changing direction depending on current state
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("UPDATED_AT")
    }

    // Changing direction depending on current state
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("UPDATED_AT")
    }
  }

  const searchReposResult = userRepos.filter((p: any) =>
    /** Search function with a useContext global keyword */
    p.name.toString().toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="settings-component">
      <span className="settings-component__results">{searchReposResult?.length ? nFormatter(searchReposResult.length) : "NONE"} REPOS</span>
      <div className="settings-component__settings">
        <span onClick={handleNameSort} className={`settings-component__settings--wrapper${current === "NAME" ? " active" : ""}`}>
          <BsTriangleFill className={current === "NAME" && direction === "DESC" ? " selected" : ""} />
          <p>Name</p>
        </span>
        <span onClick={handleModifiedSort} className={`settings-component__settings--wrapper${current === "UPDATED_AT" ? " active" : ""}`}>
          <BsTriangleFill className={current === "UPDATED_AT" && direction === "DESC" ? " selected" : ""} />
          <p>Modified</p>
        </span>
        <span onClick={handleCreatedAt} className={`settings-component__settings--wrapper${current === "CREATED_AT" ? " active" : ""}`}>
          <BsTriangleFill className={current === "CREATED_AT" && direction === "DESC" ? " selected" : ""} />
          <p>Created At</p>
        </span>
      </div>
    </section>
  )
}

export default DashboardSettings