import styles from "./Categories.module.scss";

const Nav = () => {
  return(
    <div className={styles.categoriesWrapper}>
      <h3>CATEGORIES</h3>
      <p>Select a category you would like to cast your vote</p>        
    </div>
  )
};

export default Nav;
