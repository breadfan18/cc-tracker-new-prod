import { useMemo, useState } from "react";
import { PROGRAMS } from "../constants";

export const useSortableData = (data) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    let dataCopy = data.map(i => {
      if(i.hasOwnProperty('program')) {
        return {
          ...i,
          program: i.program.name
        }
      }
      return i
    });
    if (sortConfig.key !== null) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy.map(i => {
      if(i.hasOwnProperty('program')) {
        return {
          ...i,
          program: PROGRAMS.find(p => p.name === i.program)
        }
      }
      return i
    })
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { data: sortedData, requestSort };
};
