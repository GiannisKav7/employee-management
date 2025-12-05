import { Search } from "../Search/Search";
import { FilterDepartment } from "../FilterDepartment/FilterDepartment";
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
