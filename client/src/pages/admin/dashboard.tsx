import React, {useEffect, useState} from "react";
import Nav from "shared/Nav/Nav";
import { Categories, Voters, Nominees } from "features/svgIcons/AdminStatsCard";
import styles from "../../styles/dashboard.module.scss";
import StatsCard from "shared/StatsCard";
import { type } from "os";
import { useRouter } from "next/router";

interface DashboardDigits {
  Voters: number,
  Categories: number,
  Nominees: number
}

type DashboardCounts = {
  [key in keyof DashboardDigits]?: number;
};

const Dashboard = () => {
  const router = useRouter()
  const [dashboardCount, setDashboardCount] = useState<DashboardCounts>({});
  const [error, setError] = useState(false);

  useEffect(()=>{
    const accessToken = window.localStorage.getItem('admin-auth')
    if(!accessToken){
      router.push('/admin/login-admin')
    }
    const getDashboardDigits = async () =>{
      try{
        const res = await fetch(`https://sondeka-render-api.onrender.com/admin/dashboard`, {
          headers: {
            authorization: accessToken,
          },
        })
        const data = await res.json()
        console.log(data)
        if (data && data.message === "Forbiden!") {
          setDashboardCount({});
        } else {
          setDashboardCount(data);
        }
      } catch(err){  
        console.log(err);
        setError(true);    
      }
    }
    getDashboardDigits()
  }, [])
  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <h1>Categories </h1>
        <div className={styles.statsCardsWrapper}>
          <StatsCard
            title="Voters"
            number={dashboardCount.Voters}
            icon={<Voters />}
            link={"/admin/voters"}
          />
          <StatsCard
            title="Nominees"
            number={dashboardCount.Nominees}
            icon={<Nominees />}
            link={"/admin/nominees"}
          />
          <StatsCard
            title="Categories"
            number={dashboardCount.Categories}
            icon={<Categories />}
            link={"/admin/categories"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
