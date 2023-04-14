import styles from "./AdminContentWrapper.module.scss";

const AdminContentWrapper = ({children}) => {
  return (
    <div className={styles.contentWrapper}>
      {children}
    </div>
  );
};

export default AdminContentWrapper;
