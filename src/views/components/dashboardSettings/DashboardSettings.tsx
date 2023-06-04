import { useState, useContext } from "react";
import { UserAccessTokenContext } from "../../../context/UserAccessTokenContext";
import { UserReposDataContext } from "../../../context/UserReposDataContext";
import { UserDetailsContext } from "../../../context/UserDetailsContext";
import { getUserGithubRepos } from "../../../api/graphqlRequests";
import nFormatter from "../../../utils/nFormatter";
import { BsTriangleFill } from 'react-icons/bs'
import './dashboardSettings.scss'

const DashboardSettings = () => {
  const { accessToken } = useContext(UserAccessTokenContext)
  const { userRepos, setUserRepos } = useContext(UserReposDataContext)
  const { userDetails } = useContext(UserDetailsContext)
  const { login, repositories } = userDetails
  const [direction, setDirection] = useState("ASC")
  const [current, setCurrent] = useState("CREATED_AT")

  const sortRepos = async (field: string) => {
    const fetchRepos = await getUserGithubRepos(accessToken, login, field, direction);
    setCurrent(field)
    setUserRepos(fetchRepos)
  }

  const handleNameSort = () => {
    if (current !== "NAME") {
      setDirection("ASC")
      sortRepos("NAME")
      return;
    }
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("NAME")
    }
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("NAME")
    }
  }

  const handleCreatedAt = () => {
    if (current !== "CREATED_AT") {
      setDirection("ASC")
      sortRepos("CREATED_AT")
      return;
    }
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("CREATED_AT")
    }
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("CREATED_AT")
    }
  }

  const handleModifiedSort = () => {
    if (current !== "UPDATED_AT") {
      setDirection("ASC")
      sortRepos("UPDATED_AT")
      return;
    }
    if (direction === "ASC") {
      setDirection("DESC")
      sortRepos("UPDATED_AT")
    }
    if (direction === "DESC") {
      setDirection("ASC")
      sortRepos("UPDATED_AT")
    }
  }

  if ((userRepos.length) === 0) {
    console.log("NO INFO");
  }

  return (
    <section className="settings-component">
      <span className="settings-component__results">{repositories?.totalCount ? nFormatter(repositories.totalCount) : "NONE"} REPOS</span>
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