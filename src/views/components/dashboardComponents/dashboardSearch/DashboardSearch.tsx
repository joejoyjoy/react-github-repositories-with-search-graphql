import { useContext } from "react";
import { UserReposDataContext } from "../../../../context/UserReposDataContext";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { CiSearch } from 'react-icons/ci';
import './dashboardSearch.scss'

const DashboardSearch = () => {
  const { userRepos } = useContext(UserReposDataContext)
  const { userDetails } = useContext(UserDetailsContext)

  if ((userRepos.length) === 0) {
    console.log("NO INFO");
  }

  console.log(userDetails);
  console.log(userRepos);

  return (
    <section className="search-component">
      <div className="search-component__icon">
        <CiSearch  />
      </div>
      <input type="text" className="search-component__search" placeholder="Search..." />
    </section>
  )

  return (
    <div>
      <div>DashboardPage</div>
      <h3>User Data</h3>
      {userRepos &&
        userRepos.map((repo: any) => {
          return <a href={repo.url} key={repo.id}>{repo.name}</a>
        })
      }
      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt incidunt eaque dolores nisi eveniet exercitationem eligendi est quam obcaecati, optio quisquam neque eum, a non pariatur excepturi provident esse ab.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel accusantium illum perferendis. Quod porro incidunt quasi eligendi debitis adipisci est distinctio consequuntur magni sit eaque, cum dolores totam nihil accusantium.</div>
    </div>
  )
}

export default DashboardSearch