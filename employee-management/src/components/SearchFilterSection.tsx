import { Search } from "./Search";
import { FilterDepartment } from "./FilterDepartment";
import styles from "./SearchFilterSection.module.scss";

export function SearchFilterSection() {
  return (
    <>
      <section className={styles.section}>
        <Search />
        <FilterDepartment />
      </section>
    </>
  );
}
