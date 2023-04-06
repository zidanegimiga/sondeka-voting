import React from "react";
import Nav from "shared/Nav/Nav";
import { Categories, Voters, Nominees } from "features/svgIcons/AdminStatsCard";
import styles from "../../styles/dashboard.module.scss";
import StatsCard from "shared/StatsCard";

const Dashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <Nav />
      <div className={styles.pageContent}>
        <h1>Categories </h1>
        <div className={styles.statsCardsWrapper}>
          <StatsCard
            title="Voters"
            number={"115K"}
            icon={<Voters />}
            link={"/protected/admin/voters"}
          />
          <StatsCard
            title="Nominees"
            number={"115K"}
            icon={<Nominees />}
            link={"/protected/admin/nominees"}
          />
          <StatsCard
            title="Categories"
            number={"115K"}
            icon={<Categories />}
            link={"/protected/admin/categories"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
