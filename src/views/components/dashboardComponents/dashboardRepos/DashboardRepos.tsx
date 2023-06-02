import { useContext } from "react";
import { UserReposDataContext } from "../../../../context/UserReposDataContext";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import nFormatter from "../../../../utils/nFormatter";
import './dashboardRepos.scss'

const DashboardRepos = () => {
  const { userRepos } = useContext(UserReposDataContext)
  const { userDetails } = useContext(UserDetailsContext)

  if ((userRepos.length) === 0) {
    console.log("NO INFO");
  }

  console.log(userDetails);
  console.log(userRepos);

  console.log(nFormatter(4472543));

  return (
    <div>
      {userRepos &&
        userRepos.map((repo: any) => {
          return <a href={repo.url} key={repo.id} style={{display: "block"}}>{repo.name}</a>
        })
      }
      <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt incidunt eaque dolores nisi eveniet exercitationem eligendi est quam obcaecati, optio quisquam neque eum, a non pariatur excepturi provident esse ab.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel accusantium illum perferendis. Quod porro incidunt quasi eligendi debitis adipisci est distinctio consequuntur magni sit eaque, cum dolores totam nihil accusantium.</div>
    </div>
  )
}

export default DashboardRepos